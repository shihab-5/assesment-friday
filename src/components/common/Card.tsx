import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'warning' | 'danger' | 'highlight';
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  noPadding = false,
}) => {
  const variantStyles = {
    default: 'bg-white border-slate-200/80 shadow-subtle',
    muted: 'bg-slate-50/80 border-slate-200/60 shadow-none',
    warning: 'bg-amber-50/50 border-amber-200/70 shadow-subtle',
    danger: 'bg-rose-50/50 border-rose-200/70 shadow-subtle',
    highlight: 'bg-gradient-to-b from-brand-50/60 to-white border-brand-200/70 shadow-card',
  };

  return (
    <div
      className={clsx(
        'rounded-2xl border transition-all duration-200',
        variantStyles[variant],
        !noPadding && 'p-4 sm:p-5',
        className
      )}
    >
      {children}
    </div>
  );
};
