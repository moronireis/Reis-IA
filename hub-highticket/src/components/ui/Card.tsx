import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export default function Card({
  children,
  hover = false,
  glow = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        bg-surface-1 border border-border rounded-lg relative overflow-hidden
        ${paddingStyles[padding]}
        ${hover ? 'hover:border-border-hover hover:bg-surface-2 transition-all duration-300 cursor-pointer card-glow' : ''}
        ${glow ? 'animate-border-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
