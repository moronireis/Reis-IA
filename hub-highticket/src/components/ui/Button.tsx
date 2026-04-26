import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-accent text-surface-0 font-semibold
    hover:bg-accent-light hover:shadow-[0_0_24px_rgba(0,230,96,0.3)]
    active:bg-accent-dark active:scale-[0.97]
  `,
  secondary: `
    bg-surface-2 text-text-primary border border-border
    hover:border-accent/30 hover:bg-surface-3 hover:shadow-[0_0_16px_rgba(0,230,96,0.08)]
  `,
  ghost: `
    bg-transparent text-text-secondary
    hover:text-text-primary hover:bg-surface-2
  `,
  danger: `
    bg-danger/8 text-danger border border-danger/15
    hover:bg-danger/15 hover:border-danger/30
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-sm',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 ease-out cursor-pointer
        disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
