import React, { useState } from 'react';

interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface QuizRendererProps {
  content: string;
  accentColor: string;
  onComplete?: (score: number, total: number) => void;
}

/**
 * Interactive quiz renderer for journey nodes.
 * Content format (JSON in content_body):
 * { "questions": [{ "q": "...", "options": ["A","B","C","D"], "correct": 0, "explanation": "..." }] }
 */
export default function QuizRenderer({ content, accentColor, onComplete }: QuizRendererProps): React.ReactElement {
  let questions: QuizQuestion[] = [];
  try {
    const parsed = JSON.parse(content);
    questions = parsed.questions || [];
  } catch {
    return (
      <div style={{ padding: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
        Erro ao carregar quiz.
      </div>
    );
  }

  const total = questions.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(total).fill(null));
  const [finished, setFinished] = useState(false);

  if (total === 0) {
    return <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Quiz sem perguntas.</div>;
  }

  const question = questions[currentIdx];
  const isCorrect = selected === question.correct;
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  function handleConfirm() {
    if (selected === null) return;
    setConfirmed(true);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = selected;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setFinished(true);
      const finalScore = answers.filter((a, i) => a === questions[i]?.correct).length + (isCorrect ? 1 : 0);
      onComplete?.(finalScore, total);
    }
  }

  // Results screen
  if (finished) {
    const finalScore = answers.filter((a, i) => a !== null && a === questions[i]?.correct).length;
    const pct = Math.round((finalScore / total) * 100);
    const passed = pct >= 70;

    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: passed ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)',
          border: `2px solid ${passed ? '#22C55E' : '#EF4444'}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', fontWeight: 700,
          color: passed ? '#22C55E' : '#EF4444',
          marginBottom: '16px',
        }}>
          {pct}%
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>
          {passed ? 'Aprovado!' : 'Tente novamente'}
        </h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>
          {finalScore} de {total} corretas
        </p>

        {/* Review answers */}
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {questions.map((qq, i) => {
            const userAnswer = answers[i];
            const wasCorrect = userAnswer === qq.correct;
            return (
              <div key={i} style={{
                padding: '12px 14px', borderRadius: '8px',
                background: wasCorrect ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
                border: `1px solid ${wasCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
              }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                  Pergunta {i + 1} — {wasCorrect ? 'Correta' : 'Incorreta'}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{qq.q}</div>
                {!wasCorrect && qq.explanation && (
                  <div style={{ fontSize: '12px', color: `${accentColor}`, marginTop: '6px', fontStyle: 'italic' }}>
                    {qq.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!passed && (
          <button
            onClick={() => {
              setCurrentIdx(0);
              setSelected(null);
              setConfirmed(false);
              setAnswers(new Array(total).fill(null));
              setFinished(false);
            }}
            style={{
              marginTop: '20px', padding: '10px 24px', borderRadius: '8px',
              background: `${accentColor}15`, border: `1px solid ${accentColor}30`,
              color: accentColor, fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            }}
          >
            Refazer quiz
          </button>
        )}
      </div>
    );
  }

  // Question screen
  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {currentIdx + 1} / {total}
        </span>
        <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            background: accentColor,
            width: `${((currentIdx + (confirmed ? 1 : 0)) / total) * 100}%`,
            transition: 'width 300ms ease',
          }} />
        </div>
      </div>

      {/* Question */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 16px', lineHeight: 1.5 }}>
        {question.q}
      </h3>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        {question.options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.03)';
          let border = 'rgba(255,255,255,0.06)';
          let color = 'rgba(255,255,255,0.65)';

          if (confirmed) {
            if (i === question.correct) {
              bg = 'rgba(34,197,94,0.08)';
              border = 'rgba(34,197,94,0.30)';
              color = '#22C55E';
            } else if (i === selected && i !== question.correct) {
              bg = 'rgba(239,68,68,0.06)';
              border = 'rgba(239,68,68,0.25)';
              color = '#EF4444';
            }
          } else if (i === selected) {
            bg = `${accentColor}10`;
            border = `${accentColor}40`;
            color = accentColor;
          }

          const letter = String.fromCharCode(65 + i);

          return (
            <button
              key={i}
              onClick={() => !confirmed && setSelected(i)}
              disabled={confirmed}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '10px',
                background: bg, border: `1px solid ${border}`,
                color, fontSize: '14px', textAlign: 'left',
                cursor: confirmed ? 'default' : 'pointer',
                transition: 'all 150ms',
              }}
            >
              <span style={{
                width: '26px', height: '26px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700, flexShrink: 0,
                background: i === selected || (confirmed && i === question.correct)
                  ? `${confirmed && i === question.correct ? 'rgba(34,197,94,0.15)' : `${accentColor}15`}`
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i === selected || (confirmed && i === question.correct)
                  ? (confirmed && i === question.correct ? 'rgba(34,197,94,0.30)' : `${accentColor}30`)
                  : 'rgba(255,255,255,0.08)'}`,
              }}>
                {letter}
              </span>
              <span style={{ flex: 1 }}>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation after confirm */}
      {confirmed && question.explanation && (
        <div style={{
          padding: '12px 16px', borderRadius: '8px', marginBottom: '16px',
          background: isCorrect ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
          borderLeft: `3px solid ${isCorrect ? '#22C55E' : '#EF4444'}`,
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Action button */}
      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          style={{
            width: '100%', padding: '12px', borderRadius: '10px',
            background: selected !== null ? accentColor : 'rgba(255,255,255,0.06)',
            color: selected !== null ? '#fff' : 'rgba(255,255,255,0.2)',
            fontSize: '14px', fontWeight: 600, border: 'none',
            cursor: selected !== null ? 'pointer' : 'default',
          }}
        >
          Confirmar
        </button>
      ) : (
        <button
          onClick={handleNext}
          style={{
            width: '100%', padding: '12px', borderRadius: '10px',
            background: `${accentColor}15`, border: `1px solid ${accentColor}30`,
            color: accentColor, fontSize: '14px', fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {currentIdx < total - 1 ? 'Proxima pergunta' : 'Ver resultado'}
        </button>
      )}
    </div>
  );
}
