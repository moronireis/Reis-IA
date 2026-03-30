/**
 * BookingCalendar
 * Monthly calendar grid with time slot picker.
 * Style: dark theme, matches REIS [IA] design system.
 */

import { useState } from 'react';

const TIME_SLOTS = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function formatDateValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Weekends are available — we always attend
function isWeekend(_date: Date): boolean {
  return false;
}

function isPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const startPad = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[] = [];

  for (let i = 0; i < startPad; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(new Date(year, month, d));
  // Pad to fill last row
  while (grid.length % 7 !== 0) grid.push(null);

  return grid;
}

interface BookingCalendarProps {
  onConfirm: (date: string, time: string) => void;
}

export default function BookingCalendar({ onConfirm }: BookingCalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const grid = getMonthGrid(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  }

  // Don't allow navigating before current month
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  function selectDay(day: Date) {
    if (isPast(day) || isWeekend(day)) return;
    setSelectedDate(day);
    setSelectedTime(null);
  }

  async function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    setConfirming(true);
    await onConfirm(formatDateValue(selectedDate), selectedTime);
  }

  const s = {
    card: { background: '#0e0e15', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px' } as React.CSSProperties,
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' } as React.CSSProperties,
    monthLabel: { fontSize: '18px', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' } as React.CSSProperties,
    navBtn: { width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'all 150ms', fontFamily: 'inherit' } as React.CSSProperties,
    navBtnDisabled: { opacity: 0.2, cursor: 'default' } as React.CSSProperties,
    weekRow: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0', marginBottom: '4px' } as React.CSSProperties,
    weekDay: { textAlign: 'center' as const, fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', padding: '8px 0', letterSpacing: '0.02em' },
    dayGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' } as React.CSSProperties,
    dayCell: (isActive: boolean, isSelected: boolean, isTodayDay: boolean, isDisabled: boolean): React.CSSProperties => ({
      width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: '50%', border: 'none', background: isSelected ? '#4A90FF' : 'transparent',
      color: isSelected ? '#fff' : isDisabled ? 'rgba(255,255,255,0.15)' : isTodayDay ? '#4A90FF' : 'rgba(255,255,255,0.7)',
      fontSize: '13px', fontWeight: isSelected ? 700 : isTodayDay ? 600 : 400,
      cursor: isDisabled ? 'default' : 'pointer',
      transition: 'all 120ms', fontFamily: 'inherit',
      boxShadow: isSelected ? '0 4px 12px rgba(74,144,255,0.3)' : 'none',
    }),
    timeSection: { marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' } as React.CSSProperties,
    timeLabel: { fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: '12px' } as React.CSSProperties,
    timeGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' } as React.CSSProperties,
    timeSlot: (isSelected: boolean): React.CSSProperties => ({
      padding: '10px 0', borderRadius: '10px',
      border: isSelected ? '1.5px solid #4A90FF' : '1px solid rgba(255,255,255,0.1)',
      background: isSelected ? 'rgba(74,144,255,0.12)' : 'transparent',
      color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)',
      fontSize: '14px', fontWeight: isSelected ? 600 : 400, textAlign: 'center' as const,
      cursor: 'pointer', transition: 'all 150ms', fontFamily: 'inherit',
    }),
    confirmBtn: (disabled: boolean): React.CSSProperties => ({
      width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
      background: disabled ? 'rgba(74,144,255,0.4)' : '#4A90FF',
      color: '#fff', fontSize: '15px', fontWeight: 600,
      cursor: disabled ? 'default' : 'pointer', transition: 'all 150ms',
      fontFamily: 'inherit', letterSpacing: '-0.01em', marginTop: '16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    }),
  };

  return (
    <div style={s.card}>
      {/* Today badge */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '5px 14px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Hoje é {today.toLocaleDateString('pt-BR', { weekday: 'long' })}, {String(today.getHours()).padStart(2,'0')}:{String(today.getMinutes()).padStart(2,'0')}
        </span>
      </div>

      {/* Month nav */}
      <div style={s.header}>
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          style={{ ...s.navBtn, ...(canGoPrev ? {} : s.navBtnDisabled) }}
          aria-label="Mês anterior"
        >
          ‹
        </button>
        <span style={s.monthLabel}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button type="button" onClick={nextMonth} style={s.navBtn} aria-label="Próximo mês">›</button>
      </div>

      {/* Weekday headers */}
      <div style={s.weekRow}>
        {WEEKDAYS.map((d, i) => (
          <div key={i} style={s.weekDay}>{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div style={s.dayGrid}>
        {grid.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const disabled = isPast(day) || isWeekend(day);
          const selected = selectedDate ? isSameDay(day, selectedDate) : false;
          const todayDay = isToday(day);
          return (
            <button
              key={formatDateValue(day)}
              type="button"
              onClick={() => selectDay(day)}
              disabled={disabled}
              style={s.dayCell(true, selected, todayDay, disabled)}
              aria-label={day.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              onMouseEnter={(e) => { if (!disabled && !selected) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { if (!disabled && !selected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div style={{ ...s.timeSection, animation: 'typebotFadeUp 250ms ease both' }}>
          <p style={s.timeLabel}>
            Horários para {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
          </p>
          <div style={s.timeGrid}>
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                style={s.timeSlot(selectedTime === slot)}
                onMouseEnter={(e) => { if (selectedTime !== slot) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(74,144,255,0.3)'; }}
                onMouseLeave={(e) => { if (selectedTime !== slot) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                {slot}
              </button>
            ))}
          </div>
          {!selectedTime && (
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '12px' }}>
              Toque em um horário para agendar
            </p>
          )}
        </div>
      )}

      {/* Confirm */}
      {selectedDate && selectedTime && (
        <div style={{ animation: 'typebotFadeUp 250ms ease both' }}>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={confirming}
            style={s.confirmBtn(confirming)}
          >
            {confirming ? (
              <>
                <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'typebotSpin 700ms linear infinite' }} />
                Confirmando...
              </>
            ) : (
              <>
                Confirmar — {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} às {selectedTime}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
