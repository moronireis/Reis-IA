import React, { useState, useEffect } from 'react';

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

interface Course {
  id: string;
  title: string;
  total_lessons: number;
}

interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
}

interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author: {
    id: string;
    full_name: string;
    role: string;
  };
  content: string;
  parent_id: string | null;
  created_at: string;
}

interface LessonViewProps {
  lesson: Lesson;
  course: Course;
  allLessons: Lesson[];
  progress: Progress[];
  currentUserId: string;
  currentUserName: string;
}

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'agora';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  return `${weeks}sem`;
}

function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDuration(minutes?: number): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

// SVG Icons
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function CommentItem({
  comment,
  replies,
  currentUserId,
  currentUserName,
  lessonId,
  onReplyPosted,
}: {
  comment: Comment;
  replies: Comment[];
  currentUserId: string;
  currentUserName: string;
  lessonId: string;
  onReplyPosted: (reply: Comment) => void;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/lesson-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson_id: lessonId,
          content: replyContent.trim(),
          parent_id: comment.id,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        onReplyPosted(created);
        setReplyContent('');
        setShowReplyForm(false);
      }
    } catch { /* noop */ }
    finally { setSubmitting(false); }
  };

  const isAdmin = comment.author?.role === 'admin';
  const initials = getInitials(comment.author?.full_name || 'U');

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Avatar */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '9999px',
          background: 'rgba(74,144,255,0.1)',
          color: '#4A90FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {initials}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#fff' }}>
              {comment.author?.full_name || 'Usuário'}
            </span>
            {isAdmin && (
              <span style={{
                fontSize: '10px',
                fontWeight: 500,
                padding: '1px 6px',
                borderRadius: '9999px',
                background: 'rgba(74,144,255,0.12)',
                color: '#4A90FF',
                letterSpacing: '0.04em',
              }}>
                Admin
              </span>
            )}
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              {timeAgo(comment.created_at)}
            </span>
          </div>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.6,
            margin: '0 0 8px',
          }}>
            {comment.content}
          </p>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              fontSize: '12px',
              padding: 0,
              transition: 'color 150ms',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
          >
            <ReplyIcon />
            Responder
          </button>

          {/* Reply form */}
          {showReplyForm && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <textarea
                placeholder="Escreva sua resposta..."
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '60px',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={handleSubmitReply}
                  disabled={submitting || !replyContent.trim()}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#4A90FF',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                    cursor: submitting || !replyContent.trim() ? 'not-allowed' : 'pointer',
                    opacity: submitting || !replyContent.trim() ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <SendIcon />
                  {submitting ? '...' : 'Enviar'}
                </button>
                <button
                  onClick={() => { setShowReplyForm(false); setReplyContent(''); }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Nested replies */}
          {replies.length > 0 && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              {replies.map(reply => (
                <div key={reply.id} style={{ display: 'flex', gap: '8px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '9999px',
                    background: 'rgba(74,144,255,0.08)',
                    color: '#4A90FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>
                    {getInitials(reply.author?.full_name || 'U')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                        {reply.author?.full_name || 'Usuário'}
                      </span>
                      {reply.author?.role === 'admin' && (
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 500,
                          padding: '1px 5px',
                          borderRadius: '9999px',
                          background: 'rgba(74,144,255,0.1)',
                          color: '#4A90FF',
                        }}>
                          Admin
                        </span>
                      )}
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
                        {timeAgo(reply.created_at)}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, margin: 0 }}>
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LessonView({
  lesson,
  course,
  allLessons,
  progress,
  currentUserId,
  currentUserName,
}: LessonViewProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(progress.filter(p => p.completed).map(p => p.lesson_id))
  );
  const [markingComplete, setMarkingComplete] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const isCompleted = completedLessons.has(lesson.id);
  const sortedLessons = [...allLessons].sort((a, b) => a.sort_order - b.sort_order);
  const currentIndex = sortedLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  const completedCount = completedLessons.size;
  const totalCount = sortedLessons.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/lesson-comments?lesson_id=${lesson.id}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch { /* noop */ }
      finally { setLoadingComments(false); }
    };
    fetchComments();
  }, [lesson.id]);

  const handleMarkComplete = async () => {
    if (isCompleted || markingComplete) return;
    setMarkingComplete(true);
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson_id: lesson.id, course_id: course.id }),
      });
      if (res.ok) {
        setCompletedLessons(prev => new Set([...prev, lesson.id]));
      }
    } catch { /* noop */ }
    finally { setMarkingComplete(false); }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await fetch('/api/lesson-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson_id: lesson.id,
          content: newComment.trim(),
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setComments(prev => [...prev, created]);
        setNewComment('');
      }
    } catch { /* noop */ }
    finally { setSubmittingComment(false); }
  };

  const handleReplyPosted = (reply: Comment) => {
    setComments(prev => [...prev, reply]);
  };

  // Group comments by parent
  const topLevelComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

  return (
    <div>
      {/* Back link */}
      <div style={{ marginBottom: '20px' }}>
        <a
          href={`/academy/${course.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            transition: 'color 200ms',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
        >
          <ChevronLeftIcon />
          Voltar para {course.title}
        </a>
      </div>

      {/* Video Player */}
      <div style={{
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        marginBottom: '24px',
        background: '#050505',
        aspectRatio: '16/9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {lesson.video_url ? (
          <iframe
            src={lesson.video_url}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allowFullScreen
            title={lesson.title}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
            }}>
              <PlayIcon />
            </div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', display: 'block' }}>
              Em breve
            </span>
          </div>
        )}
      </div>

      {/* Main content: lesson info + course sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: '24px',
        marginBottom: '32px',
        alignItems: 'start',
      }}>
        {/* Left: Lesson Info */}
        <div style={{
          borderRadius: '12px',
          background: '#0D0D0D',
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '24px',
        }}>
          <div style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '8px',
            fontWeight: 500,
          }}>
            Aula {currentIndex + 1} de {totalCount}
            {lesson.duration_minutes ? ` · ${formatDuration(lesson.duration_minutes)}` : ''}
          </div>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.3,
            marginBottom: '12px',
          }}>
            {lesson.title}
          </h1>
          {lesson.description && (
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}>
              {lesson.description}
            </p>
          )}

          {/* Mark complete button */}
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted || markingComplete}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: isCompleted ? 'rgba(34,197,94,0.1)' : '#4A90FF',
              color: isCompleted ? '#22C55E' : '#fff',
              border: isCompleted ? '1px solid rgba(34,197,94,0.2)' : 'none',
              fontSize: '13px',
              fontWeight: 500,
              cursor: isCompleted ? 'default' : markingComplete ? 'not-allowed' : 'pointer',
              opacity: markingComplete ? 0.6 : 1,
              transition: 'background 200ms',
            }}
          >
            <CheckIcon size={14} />
            {isCompleted ? 'Aula concluída' : markingComplete ? 'Salvando...' : 'Marcar como concluída'}
          </button>

          {/* Prev/Next navigation */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {prevLesson && (
              <a
                href={`/academy/lesson/${prevLesson.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'border-color 150ms, color 150ms',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <ChevronLeftIcon />
                Anterior
              </a>
            )}
            {nextLesson && (
              <a
                href={`/academy/lesson/${nextLesson.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#4A90FF',
                  border: 'none',
                  color: '#fff',
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'background 150ms',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#3570CC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#4A90FF'}
              >
                Próxima
                <ChevronRightIcon />
              </a>
            )}
          </div>
        </div>

        {/* Right: Course Sidebar */}
        <div style={{
          borderRadius: '12px',
          background: '#0D0D0D',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          position: 'sticky',
          top: '80px',
        }}>
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
              Conteúdo do Curso
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
              {completedCount} / {totalCount} aulas
            </div>
          </div>

          {/* Lesson list */}
          <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
            {sortedLessons.map((l, index) => {
              const done = completedLessons.has(l.id);
              const isCurrent = l.id === lesson.id;
              const isUnpublished = l.status !== 'published';

              return (
                <button
                  key={l.id}
                  onClick={() => !isUnpublished && (window.location.href = `/academy/lesson/${l.id}`)}
                  disabled={isUnpublished}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    background: isCurrent ? 'rgba(74,144,255,0.06)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    borderLeft: isCurrent ? '2px solid #4A90FF' : '2px solid transparent',
                    cursor: isUnpublished ? 'not-allowed' : 'pointer',
                    opacity: isUnpublished ? 0.35 : 1,
                    textAlign: 'left',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={e => {
                    if (!isCurrent && !isUnpublished) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={e => {
                    if (!isCurrent) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {/* Status indicator */}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '9999px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: done ? 'rgba(34,197,94,0.1)' : isCurrent ? 'rgba(74,144,255,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${done ? 'rgba(34,197,94,0.2)' : isCurrent ? 'rgba(74,144,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    color: done ? '#22C55E' : isCurrent ? '#4A90FF' : 'rgba(255,255,255,0.25)',
                  }}>
                    {done ? (
                      <CheckIcon size={10} />
                    ) : (
                      <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <span style={{
                    fontSize: '12px',
                    color: isCurrent ? '#fff' : done ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.6)',
                    fontWeight: isCurrent ? 500 : 400,
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                  }}>
                    {l.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>Progresso</span>
              <span style={{ fontSize: '11px', color: '#4A90FF', fontWeight: 500 }}>{progressPct}%</span>
            </div>
            <div style={{
              height: '3px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progressPct}%`,
                background: '#4A90FF',
                borderRadius: '9999px',
                transition: 'width 400ms ease',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div style={{
        borderRadius: '12px',
        background: '#0D0D0D',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
            Comentarios e Duvidas
          </h2>
          {!loadingComments && (
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              padding: '2px 7px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {topLevelComments.length}
            </span>
          )}
        </div>

        <div style={{ padding: '20px' }}>
          {/* New comment input */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '24px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              background: 'rgba(74,144,255,0.1)',
              color: '#4A90FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {getInitials(currentUserName)}
            </div>
            <div style={{ flex: 1 }}>
              <textarea
                placeholder="Escreva sua duvida ou comentario..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '72px',
                  boxSizing: 'border-box',
                  lineHeight: 1.6,
                  fontFamily: 'inherit',
                }}
                onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(74,144,255,0.3)'}
                onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button
                  onClick={handleSubmitComment}
                  disabled={submittingComment || !newComment.trim()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: '#4A90FF',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: 'none',
                    cursor: submittingComment || !newComment.trim() ? 'not-allowed' : 'pointer',
                    opacity: submittingComment || !newComment.trim() ? 0.5 : 1,
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={e => { if (!submittingComment && newComment.trim()) (e.currentTarget as HTMLElement).style.background = '#3570CC'; }}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#4A90FF'}
                >
                  <SendIcon />
                  {submittingComment ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          {loadingComments ? (
            <div style={{ textAlign: 'center', padding: '24px 0', fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
              Carregando comentarios...
            </div>
          ) : topLevelComments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
                Nenhum comentario ainda. Seja o primeiro a perguntar.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {topLevelComments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  replies={getReplies(comment.id)}
                  currentUserId={currentUserId}
                  currentUserName={currentUserName}
                  lessonId={lesson.id}
                  onReplyPosted={handleReplyPosted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
