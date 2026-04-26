import React from 'react';

/**
 * AGENTES [IA] → Comunidade R$497 upsell card.
 *
 * Why a separate component (vs UpgradeCTA.tsx):
 *   UpgradeCTA is a full-page lock screen used when a starter user hits a
 *   restricted area (Vault, Mentoria, etc.). This card is INLINE — sits at the
 *   bottom of the AGENTES [IA] course page as a soft conversion path. Different
 *   shape, different intent, different copy register.
 *
 * Renders only when the viewer holds the 'agentes_ia' entitlement but NOT
 * 'comunidade_497'. Caller passes that as `show`.
 */

interface Props {
  show: boolean;
  ctaHref?: string;
}

export default function AgentesIaUpsellCard({ show, ctaHref = 'https://comunidade.moronireis.com.br' }: Props) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #111 60%, rgba(74,144,255,0.08) 100%)',
        border: '1px solid rgba(74,144,255,0.25)',
        borderRadius: '16px',
        padding: '28px 32px',
        margin: '32px 0',
        overflow: 'hidden',
      }}
    >
      {/* glow */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,144,255,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              color: '#4A90FF',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Próximo nível
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
            Já dominou os agentes? Entre na <span style={{ color: '#4A90FF' }}>Comunidade Reis IA</span>.
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: '0 0 16px 0' }}>
            Encontros mensais ao vivo com Moroni, banco de prompts atualizado, casos reais, mentoria em grupo e network com quem está faturando com IA. <strong style={{ color: '#fff' }}>R$497 à vista</strong> ou 12x R$51.
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
            {[
              'Encontros ao vivo mensais',
              'Banco de prompts premium',
              'Casos reais detalhados',
              'Mentoria em grupo',
            ].map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A90FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '200px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', marginBottom: '2px' }}>R$ 1.997/ano</div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#4A90FF', letterSpacing: '-0.03em', lineHeight: 1 }}>R$ 497</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: "'JetBrains Mono', ui-monospace, monospace", marginTop: '4px' }}>
              ou 12x R$ 51
            </div>
          </div>
          <a
            href={ctaHref}
            target={ctaHref.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              borderRadius: '10px',
              background: '#4A90FF',
              color: '#000',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 10px 30px rgba(74,144,255,0.25)',
            }}
          >
            Conhecer a Comunidade →
          </a>
        </div>
      </div>
    </div>
  );
}
