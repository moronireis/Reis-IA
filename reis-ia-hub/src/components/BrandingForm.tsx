import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Section, Field } from '../lib/form-configs';

interface Props {
  formType: string;
  formTitle: string;
  sections: Section[];
  initialData: Record<string, any>;
  formId?: string;
  mentorshipId?: string;
  initialStatus?: string;
}

function countFilledFields(sections: Section[], data: Record<string, any>): { filled: number; total: number } {
  let total = 0;
  let filled = 0;
  for (const section of sections) {
    for (const field of section.fields) {
      total++;
      const val = data[field.id];
      if (Array.isArray(val) ? val.length > 0 : val && String(val).trim() !== '') {
        filled++;
      }
    }
  }
  return { filled, total };
}

export default function BrandingForm({
  formType,
  formTitle,
  sections,
  initialData,
  formId: initialFormId,
  mentorshipId,
  initialStatus,
}: Props) {
  const [data, setData] = useState<Record<string, any>>(initialData || {});
  const [activeSection, setActiveSection] = useState(0);
  const [formId, setFormId] = useState<string | undefined>(initialFormId);
  const [status, setStatus] = useState(initialStatus || 'draft');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const autoSaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSubmitted = status === 'submitted' || status === 'reviewed' || status === 'approved';

  const { filled, total } = countFilledFields(sections, data);
  const progress = total > 0 ? Math.round((filled / total) * 100) : 0;

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  const doSave = useCallback(async (submitStatus?: string) => {
    setSaving(true);
    try {
      let savedFormId = formId;

      if (!savedFormId) {
        // First save: POST to create
        const res = await fetch('/api/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form_type: formType,
            data,
            mentorship_id: mentorshipId || undefined,
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Erro ao criar formulario');
        }
        const created = await res.json();
        savedFormId = created.id;
        setFormId(savedFormId);
      } else {
        // Subsequent saves: PATCH
        const body: Record<string, any> = { data };
        if (submitStatus) body.status = submitStatus;

        const res = await fetch(`/api/forms/${savedFormId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Erro ao salvar');
        }
      }

      if (submitStatus) {
        setStatus(submitStatus);
        showToast('Formulario enviado para revisao!');
      } else {
        showToast('Rascunho salvo');
      }
      setHasChanges(false);
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar', 'error');
    } finally {
      setSaving(false);
    }
  }, [formId, formType, data, mentorshipId]);

  // Auto-save every 30s if there are unsaved changes
  useEffect(() => {
    if (autoSaveTimerRef.current) clearInterval(autoSaveTimerRef.current);
    if (isSubmitted) return;

    autoSaveTimerRef.current = setInterval(() => {
      if (hasChanges) {
        doSave();
      }
    }, 30000);

    return () => {
      if (autoSaveTimerRef.current) clearInterval(autoSaveTimerRef.current);
    };
  }, [hasChanges, doSave, isSubmitted]);

  function handleFieldChange(fieldId: string, value: any) {
    setData(prev => ({ ...prev, [fieldId]: value }));
    setHasChanges(true);
  }

  function handleCheckboxChange(fieldId: string, option: string, checked: boolean) {
    setData(prev => {
      const current: string[] = Array.isArray(prev[fieldId]) ? prev[fieldId] : [];
      const next = checked ? [...current, option] : current.filter(v => v !== option);
      return { ...prev, [fieldId]: next };
    });
    setHasChanges(true);
  }

  function renderField(field: Field) {
    const value = data[field.id];
    const inputBase: React.CSSProperties = {
      width: '100%',
      background: 'var(--surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '8px',
      color: 'var(--text-primary)',
      fontSize: 'var(--text-body-sm)',
      fontFamily: 'inherit',
      padding: '8px 12px',
      outline: 'none',
      transition: 'border-color 0.15s',
      boxSizing: 'border-box',
    };

    const labelStyle: React.CSSProperties = {
      display: 'block',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)',
      marginBottom: '6px',
      fontWeight: 500,
    };

    if (field.type === 'text') {
      return (
        <div key={field.id} style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>
            {field.label}
            {field.required && <span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>}
          </label>
          <input
            type="text"
            value={value || ''}
            onChange={e => handleFieldChange(field.id, e.target.value)}
            disabled={isSubmitted}
            style={inputBase}
          />
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.id} style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>
            {field.label}
            {field.required && <span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>}
          </label>
          <textarea
            value={value || ''}
            onChange={e => handleFieldChange(field.id, e.target.value)}
            disabled={isSubmitted}
            rows={4}
            style={{ ...inputBase, resize: 'vertical', minHeight: '96px' }}
          />
        </div>
      );
    }

    if (field.type === 'radio') {
      return (
        <div key={field.id} style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>
            {field.label}
            {field.required && <span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(field.options || []).map(opt => (
              <label
                key={opt}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: isSubmitted ? 'default' : 'pointer',
                  fontSize: 'var(--text-body-sm)',
                  color: value === opt ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                <div
                  onClick={() => !isSubmitted && handleFieldChange(field.id, opt)}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: `1.5px solid ${value === opt ? 'var(--accent-blue)' : 'var(--border-visible)'}`,
                    background: value === opt ? 'var(--blue-15)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: isSubmitted ? 'default' : 'pointer',
                  }}
                >
                  {value === opt && (
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
                  )}
                </div>
                {opt}
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === 'checkbox') {
      const currentValues: string[] = Array.isArray(value) ? value : [];
      return (
        <div key={field.id} style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>
            {field.label}
            {field.required && <span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(field.options || []).map(opt => {
              const checked = currentValues.includes(opt);
              return (
                <label
                  key={opt}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: isSubmitted ? 'default' : 'pointer',
                    fontSize: 'var(--text-body-sm)',
                    color: checked ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <div
                    onClick={() => !isSubmitted && handleCheckboxChange(field.id, opt, !checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: `1.5px solid ${checked ? 'var(--accent-blue)' : 'var(--border-visible)'}`,
                      background: checked ? 'var(--blue-15)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      cursor: isSubmitted ? 'default' : 'pointer',
                    }}
                  >
                    {checked && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  {opt}
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  }

  const currentSection = sections[activeSection];

  return (
    <div style={{ maxWidth: '720px', position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          padding: '10px 16px',
          borderRadius: '8px',
          background: toast.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: toast.type === 'success' ? '#22C55E' : '#EF4444',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 500,
        }}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-primary)', margin: 0, flex: 1 }}>
          {formTitle}
        </h2>
        {isSubmitted && (
          <span style={{
            fontSize: '12px',
            padding: '3px 10px',
            borderRadius: '20px',
            background: 'rgba(34,197,94,0.1)',
            color: '#22C55E',
            fontWeight: 600,
            border: '1px solid rgba(34,197,94,0.2)',
          }}>
            Enviado
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Progresso do formulario</span>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{filled}/{total} campos ({progress}%)</span>
        </div>
        <div style={{
          height: '4px',
          background: 'var(--surface-3)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--accent-blue)',
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Section tabs */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        {sections.map((section, i) => (
          <button
            key={i}
            onClick={() => setActiveSection(i)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: `1px solid ${activeSection === i ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
              background: activeSection === i ? 'var(--blue-10)' : 'transparent',
              color: activeSection === i ? 'var(--accent-blue)' : 'var(--text-tertiary)',
              fontSize: '12px',
              fontWeight: activeSection === i ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {i + 1}. {section.title}
          </button>
        ))}
      </div>

      {/* Active section */}
      {currentSection && (
        <div style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
        }}>
          <h3 style={{
            fontSize: 'var(--text-body-lg)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '20px',
            marginTop: 0,
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            {currentSection.title}
          </h3>
          {currentSection.fields.map(field => renderField(field))}
        </div>
      )}

      {/* Navigation between sections */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button
          onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
          disabled={activeSection === 0}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            background: 'transparent',
            color: activeSection === 0 ? 'var(--text-quaternary)' : 'var(--text-secondary)',
            fontSize: 'var(--text-body-sm)',
            cursor: activeSection === 0 ? 'default' : 'pointer',
          }}
        >
          Anterior
        </button>
        <span style={{ fontSize: '12px', color: 'var(--text-quaternary)' }}>
          {activeSection + 1} / {sections.length}
        </span>
        <button
          onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
          disabled={activeSection === sections.length - 1}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            background: 'transparent',
            color: activeSection === sections.length - 1 ? 'var(--text-quaternary)' : 'var(--text-secondary)',
            fontSize: 'var(--text-body-sm)',
            cursor: activeSection === sections.length - 1 ? 'default' : 'pointer',
          }}
        >
          Proximo
        </button>
      </div>

      {/* Action buttons */}
      {!isSubmitted && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => doSave()}
            disabled={saving || !hasChanges}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--border-visible)',
              background: 'transparent',
              color: saving || !hasChanges ? 'var(--text-quaternary)' : 'var(--text-secondary)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 500,
              cursor: saving || !hasChanges ? 'default' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {saving ? 'Salvando...' : 'Salvar rascunho'}
          </button>
          <button
            onClick={() => doSave('submitted')}
            disabled={saving}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--accent-blue)',
              background: 'var(--accent-blue)',
              color: '#000',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 600,
              cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.7 : 1,
              transition: 'all 0.15s',
            }}
          >
            Enviar para revisao
          </button>
        </div>
      )}

      {isSubmitted && (
        <div style={{
          padding: '14px 18px',
          borderRadius: '10px',
          background: 'rgba(34,197,94,0.07)',
          border: '1px solid rgba(34,197,94,0.2)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-body-sm)',
          lineHeight: 1.5,
        }}>
          Formulario enviado. Nossa equipe ira revisar e entrar em contato.
        </div>
      )}
    </div>
  );
}
