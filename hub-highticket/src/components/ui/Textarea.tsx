import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-3 py-2 text-sm rounded-md resize-y min-h-[80px]
          bg-surface-1 border border-border text-text-primary
          placeholder:text-text-muted
          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
          ${error ? 'border-danger focus:border-danger focus:ring-danger/30' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
