import React, { useState } from 'react';

type CourseType = 'trail' | 'masterclass' | 'workshop' | 'case_study';
type CoursePillar = 'builders' | 'systems' | 'marketing';
type CourseStatus = 'draft' | 'published' | 'archived';

interface Course {
  id: string;
  title: string;
  description: string;
  type: CourseType;
  pillar: CoursePillar;
  status: CourseStatus;
  sort_order: number;
  total_lessons: number;
  created_at: string;
}

interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  video_url?: string;
  duration_minutes?: number;
  sort_order: number;
  status: string;
}

interface AcademyAdminProps {
  initialCourses: Course[];
}

const STATUS_STYLES: Record<CourseStatus, { bg: string; color: string; label: string }> = {
  published: { bg: 'rgba(34,197,94,0.1)', color: '#22C55E', label: 'Publicado' },
  draft: { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B', label: 'Rascunho' },
  archived: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)', label: 'Arquivado' },
};

const PILLAR_LABELS: Record<CoursePillar, string> = {
  builders: 'Builders',
  systems: 'Systems',
  marketing: 'Marketing',
};

const TYPE_LABELS: Record<CourseType, string> = {
  trail: 'Trilha',
  masterclass: 'Masterclass',
  workshop: 'Workshop',
  case_study: 'Caso de Uso',
};

function inputStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    ...extra,
  };
}

function selectStyle(): React.CSSProperties {
  return {
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    outline: 'none',
  };
}

export default function AcademyAdmin({ initialCourses }: AcademyAdminProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New course form state
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    type: 'masterclass' as CourseType,
    pillar: 'systems' as CoursePillar,
    status: 'draft' as CourseStatus,
    sort_order: 0,
    total_lessons: 0,
  });

  // New lesson form state
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    video_url: '',
    duration_minutes: 0,
    sort_order: 0,
    status: 'draft',
  });

  const handleSelectCourse = async (course: Course) => {
    setSelectedCourse(course);
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/${course.id}`);
      if (res.ok) {
        const data = await res.json();
        setLessons(data.lessons || []);
      }
    } catch {
      setError('Erro ao carregar aulas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!newCourse.title.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao criar curso');
        return;
      }

      const created = await res.json();
      setCourses(prev => [created, ...prev]);
      setNewCourse({ title: '', description: '', type: 'masterclass', pillar: 'systems', status: 'draft', sort_order: 0, total_lessons: 0 });
      setShowCreateCourse(false);
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourseStatus = async (courseId: string, status: CourseStatus) => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status } : c));
        if (selectedCourse?.id === courseId) {
          setSelectedCourse(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch {
      setError('Erro ao atualizar status');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;
    try {
      const res = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
      if (res.ok) {
        setCourses(prev => prev.filter(c => c.id !== courseId));
        if (selectedCourse?.id === courseId) {
          setSelectedCourse(null);
          setLessons([]);
        }
      }
    } catch {
      setError('Erro ao excluir curso');
    }
  };

  const handleCreateLesson = async () => {
    if (!newLesson.title.trim() || !selectedCourse) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newLesson, course_id: selectedCourse.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao criar aula');
        return;
      }

      const created = await res.json();
      setLessons(prev => [...prev, created]);
      // Update total_lessons count
      const newTotal = lessons.length + 1;
      setCourses(prev => prev.map(c => c.id === selectedCourse.id ? { ...c, total_lessons: newTotal } : c));
      await fetch(`/api/courses/${selectedCourse.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total_lessons: newTotal }),
      });

      setNewLesson({ title: '', description: '', video_url: '', duration_minutes: 0, sort_order: 0, status: 'draft' });
      setShowCreateLesson(false);
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Excluir esta aula?')) return;
    try {
      const res = await fetch(`/api/lessons/${lessonId}`, { method: 'DELETE' });
      if (res.ok) {
        setLessons(prev => prev.filter(l => l.id !== lessonId));
        if (selectedCourse) {
          const newTotal = Math.max(0, lessons.length - 1);
          setCourses(prev => prev.map(c => c.id === selectedCourse.id ? { ...c, total_lessons: newTotal } : c));
          await fetch(`/api/courses/${selectedCourse.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ total_lessons: newTotal }),
          });
        }
      }
    } catch {
      setError('Erro ao excluir aula');
    }
  };

  const handleToggleLessonStatus = async (lessonId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, status: newStatus } : l));
      }
    } catch {
      setError('Erro ao atualizar aula');
    }
  };

  return (
    <div>
      {error && (
        <div style={{
          marginBottom: '16px',
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.25)',
          color: '#EF4444',
          fontSize: '13px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px' }}>×</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Courses list */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
              Cursos ({courses.length})
            </h2>
            <button
              onClick={() => setShowCreateCourse(!showCreateCourse)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#4A90FF',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              + Novo Curso
            </button>
          </div>

          {/* Create course form */}
          {showCreateCourse && (
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <input
                placeholder="Título do curso"
                value={newCourse.title}
                onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))}
                style={inputStyle()}
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={newCourse.description}
                onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))}
                style={inputStyle({ resize: 'vertical', minHeight: '72px' })}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <select value={newCourse.type} onChange={e => setNewCourse(p => ({ ...p, type: e.target.value as CourseType }))} style={selectStyle()}>
                  <option value="trail">Trilha</option>
                  <option value="masterclass">Masterclass</option>
                  <option value="workshop">Workshop</option>
                  <option value="case_study">Caso de Uso</option>
                </select>
                <select value={newCourse.pillar} onChange={e => setNewCourse(p => ({ ...p, pillar: e.target.value as CoursePillar }))} style={selectStyle()}>
                  <option value="builders">Builders</option>
                  <option value="systems">Systems</option>
                  <option value="marketing">Marketing</option>
                </select>
                <select value={newCourse.status} onChange={e => setNewCourse(p => ({ ...p, status: e.target.value as CourseStatus }))} style={selectStyle()}>
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowCreateCourse(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '13px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button onClick={handleCreateCourse} disabled={loading} style={{ padding: '8px 16px', borderRadius: '8px', background: '#4A90FF', color: '#fff', fontSize: '13px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Criando...' : 'Criar Curso'}
                </button>
              </div>
            </div>
          )}

          {/* Courses table */}
          <div style={{
            borderRadius: '12px',
            background: '#0A0A0A',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}>
            {courses.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
                Nenhum curso. Crie o primeiro.
              </div>
            ) : (
              courses.map(course => {
                const s = STATUS_STYLES[course.status];
                const isSelected = selectedCourse?.id === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => handleSelectCourse(course)}
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(74,144,255,0.05)' : 'transparent',
                      transition: 'background 150ms',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                    onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {course.title}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                          {TYPE_LABELS[course.type]} · {PILLAR_LABELS[course.pillar]}
                        </span>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
                          {course.total_lessons} aulas
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: s.bg,
                        color: s.color,
                      }}>
                        {s.label}
                      </span>
                      <select
                        value={course.status}
                        onChange={e => { e.stopPropagation(); handleUpdateCourseStatus(course.id, e.target.value as CourseStatus); }}
                        onClick={e => e.stopPropagation()}
                        style={{ ...selectStyle(), fontSize: '11px', padding: '4px 8px' }}
                      >
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicado</option>
                        <option value="archived">Arquivado</option>
                      </select>
                      <button
                        onClick={e => { e.stopPropagation(); handleDeleteCourse(course.id); }}
                        style={{ background: 'none', border: 'none', color: 'rgba(239,68,68,0.4)', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'color 150ms' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EF4444'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(239,68,68,0.4)'}
                        title="Excluir curso"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Lessons */}
        <div>
          {selectedCourse ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>
                    Aulas — {selectedCourse.title}
                  </h2>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{lessons.length} aulas</span>
                </div>
                <button
                  onClick={() => setShowCreateLesson(!showCreateLesson)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'rgba(74,144,255,0.1)',
                    color: '#4A90FF',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: '1px solid rgba(74,144,255,0.2)',
                    cursor: 'pointer',
                  }}
                >
                  + Nova Aula
                </button>
              </div>

              {/* Create lesson form */}
              {showCreateLesson && (
                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.08)',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  <input
                    placeholder="Título da aula"
                    value={newLesson.title}
                    onChange={e => setNewLesson(p => ({ ...p, title: e.target.value }))}
                    style={inputStyle()}
                  />
                  <input
                    placeholder="URL do vídeo (opcional)"
                    value={newLesson.video_url}
                    onChange={e => setNewLesson(p => ({ ...p, video_url: e.target.value }))}
                    style={inputStyle()}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      placeholder="Duração (min)"
                      value={newLesson.duration_minutes || ''}
                      onChange={e => setNewLesson(p => ({ ...p, duration_minutes: parseInt(e.target.value) || 0 }))}
                      style={inputStyle({ width: '140px', flex: 'none' })}
                    />
                    <input
                      type="number"
                      placeholder="Ordem"
                      value={newLesson.sort_order || ''}
                      onChange={e => setNewLesson(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                      style={inputStyle({ width: '100px', flex: 'none' })}
                    />
                    <select
                      value={newLesson.status}
                      onChange={e => setNewLesson(p => ({ ...p, status: e.target.value }))}
                      style={selectStyle()}
                    >
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicada</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setShowCreateLesson(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '13px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
                      Cancelar
                    </button>
                    <button onClick={handleCreateLesson} disabled={loading} style={{ padding: '8px 16px', borderRadius: '8px', background: '#4A90FF', color: '#fff', fontSize: '13px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
                      {loading ? 'Criando...' : 'Criar Aula'}
                    </button>
                  </div>
                </div>
              )}

              {/* Lessons list */}
              <div style={{
                borderRadius: '12px',
                background: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden',
              }}>
                {loading && !lessons.length ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
                    Carregando aulas...
                  </div>
                ) : lessons.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
                    Nenhuma aula. Adicione a primeira.
                  </div>
                ) : (
                  lessons.map((lesson, index) => (
                    <div key={lesson.id} style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', width: '20px', flexShrink: 0 }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', color: '#fff', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lesson.title}
                        </div>
                        {lesson.duration_minutes ? (
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                            {lesson.duration_minutes}min
                          </div>
                        ) : null}
                      </div>
                      <button
                        onClick={() => handleToggleLessonStatus(lesson.id, lesson.status)}
                        style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          background: lesson.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                          color: lesson.status === 'published' ? '#22C55E' : '#F59E0B',
                          border: 'none',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(lesson.id)}
                        style={{ background: 'none', border: 'none', color: 'rgba(239,68,68,0.35)', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'color 150ms' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EF4444'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(239,68,68,0.35)'}
                        title="Excluir aula"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              borderRadius: '12px',
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>
                Selecione um curso para gerenciar suas aulas
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
