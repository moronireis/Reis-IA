import React, { useState } from 'react';

type CoursePillar = 'builders' | 'systems' | 'marketing';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  type: string;
  pillar: CoursePillar;
  status: string;
  total_lessons: number;
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

interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
}

interface CourseDetailProps {
  course: Course;
  lessons: Lesson[];
  progress: Progress[];
  userId: string;
}

const PILLAR_GRADIENTS: Record<CoursePillar, string> = {
  builders: 'linear-gradient(135deg, #1050BB 0%, #2D7AFF 100%)',
  systems: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, rgba(74,144,255,0.12) 100%)',
  marketing: 'linear-gradient(135deg, #3570CC 0%, #4A90FF 100%)',
};

const PILLAR_LABELS: Record<CoursePillar, string> = {
  builders: 'Builders',
  systems: 'Systems',
  marketing: 'Marketing',
};

const TYPE_LABELS: Record<string, string> = {
  trail: 'Trilha',
  masterclass: 'Masterclass',
  workshop: 'Workshop',
  case_study: 'Caso de Uso',
};

function formatDuration(minutes?: number): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

function getTotalDuration(lessons: Lesson[]): string {
  const total = lessons.reduce((acc, l) => acc + (l.duration_minutes || 0), 0);
  return formatDuration(total);
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function CourseDetail({ course, lessons, progress, userId }: CourseDetailProps) {
  const [completedLessons] = useState<Set<string>>(
    new Set(progress.filter(p => p.completed).map(p => p.lesson_id))
  );
  const [error, setError] = useState<string | null>(null);

  const pillar = course.pillar as CoursePillar;
  const completedCount = completedLessons.size;
  const totalCount = lessons.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const sortedLessons = [...lessons].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div>
      {error && (
        <div style={{
          marginBottom: '16px',
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.2)',
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

      {/* Course Header */}
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '28px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Hero banner with gradient */}
        <div style={{
          height: '200px',
          background: PILLAR_GRADIENTS[pillar] || PILLAR_GRADIENTS.systems,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '24px',
          position: 'relative',
        }}>
          {/* Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(0,0,0,0.45)',
                color: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(6px)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {PILLAR_LABELS[pillar] || pillar}
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(74,144,255,0.3)',
                color: '#fff',
                backdropFilter: 'blur(6px)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {TYPE_LABELS[course.type] || course.type}
              </span>
            </div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1.2,
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}>
              {course.title}
            </h1>
          </div>
        </div>

        {/* Course meta strip */}
        <div style={{ padding: '20px 24px', background: '#111111' }}>
          {course.description && (
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.65,
              marginBottom: '16px',
            }}>
              {course.description}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: progressPct > 0 ? '16px' : 0 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              {totalCount} {totalCount === 1 ? 'aula' : 'aulas'}
            </span>
            {getTotalDuration(sortedLessons) && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {getTotalDuration(sortedLessons)}
              </span>
            )}
            {completedCount > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#22C55E' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {completedCount} concluida{completedCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Progress bar */}
          {progressPct > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Progresso</span>
                <span style={{ fontSize: '12px', color: progressPct === 100 ? '#22C55E' : '#4A90FF', fontWeight: 500 }}>
                  {progressPct}%
                </span>
              </div>
              <div style={{
                height: '4px',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${progressPct}%`,
                  background: progressPct === 100 ? '#22C55E' : '#4A90FF',
                  borderRadius: '9999px',
                  transition: 'width 400ms ease',
                }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back link */}
      <div style={{ marginBottom: '20px' }}>
        <a href="/academy" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.35)',
          textDecoration: 'none',
          transition: 'color 200ms',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Voltar para Academy
        </a>
      </div>

      {/* Lessons List */}
      <div style={{
        borderRadius: '12px',
        background: '#0A0A0A',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>
            Aulas do Curso
          </h2>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            {completedCount}/{totalCount} concluidas
          </span>
        </div>

        {sortedLessons.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
            Nenhuma aula publicada ainda.
          </div>
        ) : (
          <div>
            {sortedLessons.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              const isUnpublished = lesson.status !== 'published';

              return (
                <a
                  key={lesson.id}
                  href={isUnpublished ? undefined : `/academy/lesson/${lesson.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    cursor: isUnpublished ? 'not-allowed' : 'pointer',
                    background: 'transparent',
                    transition: 'background 150ms',
                    opacity: isUnpublished ? 0.35 : 1,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  onMouseEnter={e => {
                    if (!isUnpublished) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {/* Status icon */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: isCompleted
                      ? 'rgba(34,197,94,0.1)'
                      : isUnpublished
                        ? 'rgba(255,255,255,0.04)'
                        : 'rgba(74,144,255,0.08)',
                    border: `1px solid ${isCompleted
                      ? 'rgba(34,197,94,0.2)'
                      : isUnpublished
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(74,144,255,0.15)'}`,
                    color: isCompleted ? '#22C55E' : isUnpublished ? 'rgba(255,255,255,0.25)' : '#4A90FF',
                  }}>
                    {isCompleted ? (
                      <CheckIcon size={14} />
                    ) : isUnpublished ? (
                      <LockIcon />
                    ) : (
                      <PlayIcon />
                    )}
                  </div>

                  {/* Lesson info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontWeight: 500, flexShrink: 0 }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: isCompleted ? 'rgba(255,255,255,0.5)' : '#fff',
                        fontWeight: 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        textDecorationColor: 'rgba(255,255,255,0.15)',
                      }}>
                        {lesson.title}
                      </span>
                    </div>
                    {lesson.duration_minutes ? (
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px', paddingLeft: '26px' }}>
                        {formatDuration(lesson.duration_minutes)}
                      </div>
                    ) : null}
                  </div>

                  {/* Arrow indicator for published lessons */}
                  {!isUnpublished && (
                    <span style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }}>
                      <ChevronRightIcon />
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
