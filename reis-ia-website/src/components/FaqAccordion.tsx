import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        transition: 'transform var(--duration-normal, 300ms) var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)), color var(--duration-fast, 200ms)',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        color: isOpen ? 'var(--accent-blue, #4A90FF)' : 'var(--text-tertiary, rgba(255,255,255,0.50))',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div style={{ borderTop: '1px solid var(--border-default, rgba(255,255,255,0.08))' }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} style={{ borderBottom: '1px solid var(--border-default, rgba(255,255,255,0.08))' }}>
            <button
              className="w-full text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              style={{
                padding: '24px 0',
                background: 'transparent',
                border: 'none',
                fontFamily: 'inherit',
              }}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span
                style={{
                  fontSize: 'var(--text-body-lg, 18px)',
                  fontWeight: 600,
                  color: 'var(--text-primary, #FFFFFF)',
                  paddingRight: '16px',
                  transition: 'color var(--duration-fast, 200ms)',
                }}
              >
                {item.question}
              </span>
              <ChevronIcon isOpen={isOpen} />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              style={{
                maxHeight: isOpen ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease-out',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div style={{ paddingBottom: '24px' }}>
                <p style={{
                  fontSize: 'var(--text-body, 16px)',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary, rgba(255,255,255,0.70))',
                  maxWidth: 'var(--container-text, 680px)',
                  margin: 0,
                }}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
