import { useState } from 'react';

interface AccordionItem {
  question: string;
  answer: string;
}

const defaultItems: AccordionItem[] = [
  {
    question: 'What is Reis IA?',
    answer: 'Reis IA is a high-ticket AI consultancy that helps businesses implement artificial intelligence systems to multiply revenue and save time. Led by Moroni Reis, we focus on strategic AI implementation, not generic tools.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most implementations follow a 6-week timeline: Week 1 for discovery, Weeks 2-3 for architecture, Weeks 4-5 for implementation and testing, and Week 6 for deployment and handoff. Complex projects may extend to 8-12 weeks.',
  },
  {
    question: 'What results can I expect?',
    answer: 'Typical results include 60-80% reduction in manual processing time, 3-5x increase in content output, and measurable ROI within the first 90 days. Every engagement begins with a strategy call to define specific KPIs.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes. After the initial implementation, we offer three levels of ongoing support: monitoring and maintenance, optimization sprints, and full managed AI operations. The right level depends on your team and goals.',
  },
];

interface Props {
  items?: AccordionItem[];
}

/**
 * AccordionDemo — Interactive FAQ-style accordion with expand/collapse animation.
 */
export default function AccordionDemo({ items = defaultItems }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              borderBottom: index < items.length - 1 ? '1px solid var(--border-default)' : 'none',
            }}
          >
            {/* Question */}
            <button
              onClick={() => toggle(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '24px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--surface-2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
              aria-expanded={isOpen}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  paddingRight: '16px',
                }}
              >
                {item.question}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isOpen ? 'var(--accent-blue)' : 'var(--text-tertiary)',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms',
                  fontSize: '24px',
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </button>

            {/* Answer */}
            <div
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
                transition: 'max-height 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{ padding: '0 24px 24px 24px', maxWidth: '680px' }}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
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
