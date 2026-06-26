import { useRef, useState, useEffect, useCallback } from 'react';

interface AudioPlayerProps {
  src: string | null;
  mime?: string | null;
}

function hashNum(s: string, i: number): number {
  let h = 0;
  for (let j = 0; j < s.length; j++) h = (Math.imul(31, h) + s.charCodeAt(j)) >>> 0;
  return (Math.abs(Math.sin((h + i) * 127.1 + i * 311.7)) * 10000) % 1;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCt] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const BARS = 52;

  const bars = useRef<number[]>([]);
  useEffect(() => {
    if (!src) return;
    bars.current = Array.from({ length: BARS }, (_, i) => {
      const raw = hashNum(src, i);
      const bell = Math.exp(-Math.pow((i / BARS - 0.5) * 3, 2));
      return 0.15 + raw * 0.7 * bell + 0.1;
    });
  }, [src]);

  const drawCanvas = useCallback((prog: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);
    const barW = W / BARS - 1;
    for (let i = 0; i < BARS; i++) {
      const h = (bars.current[i] || 0.3) * H * 0.85;
      const x = i * (barW + 1);
      const y = (H - h) / 2;
      const filled = i / BARS < prog;
      ctx.fillStyle = filled
        ? 'rgba(201,169,110,0.9)'
        : 'rgba(244,239,230,0.2)';
      ctx.fillRect(x, y, barW, h);
    }
  }, []);

  useEffect(() => {
    const loop = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        const p = audio.duration ? audio.currentTime / audio.duration : 0;
        setProgress(p);
        setCt(audio.currentTime);
        drawCanvas(p);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawCanvas]);

  useEffect(() => { drawCanvas(progress); }, [progress, drawCanvas]);

  if (!src) {
    return (
      <div style={{ color: 'rgba(244,239,230,0.6)', fontSize: '0.8rem', padding: '0.5rem 0' }}>
        Áudio indisponível
      </div>
    );
  }

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); }
    else { a.pause(); setPlaying(false); }
  };

  const seek = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const a = audioRef.current;
    const canvas = canvasRef.current;
    if (!a || !canvas || !a.duration) return;
    const rect = canvas.getBoundingClientRect();
    const p = (e.clientX - rect.left) / rect.width;
    a.currentTime = p * a.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 200 }}>
      <button
        onClick={toggle}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#C9A96E', flexShrink: 0, padding: 0,
        }}
      >
        {playing ? (
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7-.75a.75.75 0 0 0-.75.75v13.5c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75h-1.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <div style={{ flex: 1 }}>
        <canvas
          ref={canvasRef}
          width={180}
          height={32}
          onClick={seek}
          style={{ cursor: 'pointer', display: 'block', width: '100%', height: 32 }}
        />
      </div>
      <span style={{ fontSize: '0.72rem', color: 'rgba(244,239,230,0.6)', flexShrink: 0, minWidth: 32 }}>
        {playing ? fmt(currentTime) : fmt(duration)}
      </span>
      {loadError && (
        <a href={src} target="_blank" rel="noreferrer" style={{ fontSize: '0.72rem', color: '#C9A96E' }}>
          Abrir
        </a>
      )}
      <audio
        ref={audioRef}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => { setPlaying(false); setProgress(0); setCt(0); drawCanvas(0); }}
        onError={() => setLoadError(true)}
        preload="metadata"
      >
        {src && <source src={src} type="audio/ogg" />}
        {src && <source src={src} type="audio/mpeg" />}
        {src && <source src={src} type="audio/mp4" />}
      </audio>
    </div>
  );
}
