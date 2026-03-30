import React, { useState } from 'react';

type CourseType = 'trail' | 'masterclass' | 'workshop' | 'case_study';
type CoursePillar = 'builders' | 'systems' | 'marketing';
type CourseStatus = 'draft' | 'published' | 'archived';
type AccessLevel = 'starter' | 'builder' | 'mentoria' | 'admin';

const ROLE_LEVEL: Record<string, number> = {
  starter: 1,
  builder: 2,
  mentoria: 3,
  admin: 4,
};

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  type: CourseType;
  pillar: CoursePillar;
  status: CourseStatus;
  sort_order: number;
  total_lessons: number;
  created_at: string;
  access_level?: AccessLevel;
}

interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
  progress_seconds?: number;
  completed_at?: string;
}

interface AcademyCatalogProps {
  courses: Course[];
  userProgress: Progress[];
  userRole?: string;
}

const ACCESS_LEVEL_LABELS: Record<AccessLevel, string> = {
  starter: 'Starter',
  builder: 'Builder',
  mentoria: 'Mentoria',
  admin: 'Admin',
};

type FilterType = 'all' | CourseType;

const PILLAR_GRADIENTS: Record<CoursePillar, string> = {
  builders: 'linear-gradient(135deg, #1050BB 0%, #2D7AFF 100%)',
  systems: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, rgba(74,144,255,0.15) 100%)',
  marketing: 'linear-gradient(135deg, #3570CC 0%, #4A90FF 100%)',
};

const PILLAR_COLORS: Record<CoursePillar, string> = {
  builders: '#2D7AFF',
  systems: '#4A90FF',
  marketing: '#4A90FF',
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

const FILTER_TABS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'trail', label: 'Trilhas' },
  { id: 'masterclass', label: 'Masterclasses' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'case_study', label: 'Cases' },
];

function getCourseProgress(courseId: string, progress: Progress[], totalLessons: number): number {
  if (!totalLessons) return 0;
  const completed = progress.filter(p => p.course_id === courseId && p.completed).length;
  return Math.round((completed / totalLessons) * 100);
}

function formatTotalDuration(totalMinutes: number): string {
  if (!totalMinutes) return '';
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}min`;
  return m ? `${h}h ${m}min` : `${h}h`;
}

// Pillar SVG icons (subtle, shown in thumbnail at low opacity)
function BuildersIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function SystemsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
    </svg>
  );
}

function MarketingIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function PillarIcon({ pillar }: { pillar: CoursePillar }) {
  if (pillar === 'builders') return <BuildersIcon />;
  if (pillar === 'systems') return <SystemsIcon />;
  return <MarketingIcon />;
}

function CourseCard({ course, progress, userRole }: { course: Course; progress: number; userRole?: string }) {
  const pillar = course.pillar as CoursePillar;
  const requiredLevel = ROLE_LEVEL[course.access_level || 'starter'] || 1;
  const userLevel = ROLE_LEVEL[userRole || 'starter'] || 1;
  const isLocked = userLevel < requiredLevel;
  const upgradeLabel = course.access_level ? ACCESS_LEVEL_LABELS[course.access_level as AccessLevel] : null;

  const cardStyle: React.CSSProperties = {
    display: 'block',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.06)',
    textDecoration: 'none',
    transition: 'border-color 200ms ease, transform 200ms ease',
    flexShrink: 0,
    position: 'relative',
    cursor: isLocked ? 'default' : 'pointer',
  };

  const thumbnailContent = (
    <div style={{
      width: '100%',
      paddingTop: '56.25%',
      background: PILLAR_GRADIENTS[pillar] || PILLAR_GRADIENTS.systems,
      position: 'relative',
      overflow: 'hidden',
      opacity: isLocked ? 0.35 : 1,
    }}>
      {course.thumbnail_url ? (
        <img
          src={course.thumbnail_url}
          alt={course.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)',
        }}>
          <PillarIcon pillar={pillar} />
        </div>
      )}

      <span style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontSize: '10px',
        fontWeight: 500,
        padding: '3px 8px',
        borderRadius: '9999px',
        background: 'rgba(0,0,0,0.55)',
        color: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(4px)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase' as const,
      }}>
        {TYPE_LABELS[course.type] || course.type}
      </span>
    </div>
  );

  const cardBody = (
    <div style={{ padding: '12px 14px 14px', opacity: isLocked ? 0.45 : 1 }}>
      <div style={{
        fontSize: '10px',
        color: PILLAR_COLORS[pillar],
        marginBottom: '5px',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.07em',
      }}>
        {PILLAR_LABELS[pillar]}
      </div>

      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: '#fff',
        lineHeight: 1.35,
        marginBottom: '8px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
      }}>
        {course.title}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.35)',
        marginBottom: progress > 0 ? '10px' : '0',
      }}>
        <span>{course.total_lessons || 0} {course.total_lessons === 1 ? 'aula' : 'aulas'}</span>
      </div>

      {progress > 0 && !isLocked && (
        <div>
          <div style={{
            height: '3px',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.07)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: progress === 100 ? '#22C55E' : '#4A90FF',
              borderRadius: '9999px',
              transition: 'width 300ms ease',
            }} />
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px', textAlign: 'right' }}>
            {progress === 100 ? 'Concluido' : `${progress}%`}
          </div>
        </div>
      )}
    </div>
  );

  if (isLocked) {
    return (
      <div style={cardStyle}>
        {thumbnailContent}
        {/* Lock overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.55)',
          gap: '8px',
          paddingBottom: '20px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          {upgradeLabel && (
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(0,0,0,0.5)',
              padding: '3px 10px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              Upgrade para {upgradeLabel}
            </span>
          )}
        </div>
        {cardBody}
      </div>
    );
  }

  return (
    <a
      href={`/academy/${course.id}`}
      style={cardStyle}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {thumbnailContent}
      {cardBody}
    </a>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', margin: 0 }}>
        {title}
      </h2>
      <span style={{
        fontSize: '11px',
        fontWeight: 500,
        padding: '2px 7px',
        borderRadius: '9999px',
        background: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.35)',
      }}>
        {count}
      </span>
    </div>
  );
}

export default function AcademyCatalog({ courses, userProgress, userRole = 'starter' }: AcademyCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const inProgressCourses = courses.filter(c => {
    const prog = getCourseProgress(c.id, userProgress, c.total_lessons);
    return prog > 0 && prog < 100;
  });

  const filteredCourses = activeFilter === 'all'
    ? courses
    : courses.filter(c => c.type === activeFilter);

  if (!courses.length) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'rgba(74,144,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>
          Nenhum curso disponivel
        </h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
          Os cursos serao publicados em breve.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Type filter tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '28px',
        overflowX: 'auto',
        paddingBottom: '2px',
      }}>
        {FILTER_TABS.map(tab => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '7px 16px',
                borderRadius: '9999px',
                background: isActive ? '#4A90FF' : 'rgba(255,255,255,0.05)',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                border: 'none',
                fontSize: '13px',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 150ms, color 150ms',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Continue Watching — only shown when there's in-progress AND filter is "all" */}
      {activeFilter === 'all' && inProgressCourses.length > 0 && (
        <div style={{ marginBottom: '36px' }}>
          <SectionHeader title="Continuar Assistindo" count={inProgressCourses.length} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {inProgressCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                progress={getCourseProgress(course.id, userProgress, course.total_lessons)}
                userRole={userRole}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main grid */}
      {filteredCourses.length > 0 ? (
        <div>
          {activeFilter !== 'all' && (
            <SectionHeader
              title={TYPE_LABELS[activeFilter as CourseType] + 's'}
              count={filteredCourses.length}
            />
          )}
          {activeFilter === 'all' && (
            <SectionHeader title="Todos os Cursos" count={filteredCourses.length} />
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                progress={getCourseProgress(course.id, userProgress, course.total_lessons)}
                userRole={userRole}
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
            Nenhum conteudo nessa categoria ainda.
          </p>
        </div>
      )}
    </div>
  );
}
