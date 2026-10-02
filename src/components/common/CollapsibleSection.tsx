'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  variant?: 'default' | 'highlight' | 'warning' | 'danger' | 'muted';
  className?: string;
  noPadding?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  subtitle,
  icon,
  badge,
  defaultOpen = true,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  children,
  headerRight,
  variant = 'default',
  className,
  noPadding = false,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const variantStyles = {
    default: 'bg-white border-slate-200/80 shadow-subtle',
    highlight: 'bg-white border-brand-200 shadow-card',
    warning: 'bg-amber-50/40 border-amber-200/80 shadow-subtle',
    danger: 'bg-rose-50/40 border-rose-200/80 shadow-subtle',
    muted: 'bg-slate-50/80 border-slate-200/60 shadow-none',
  };

  return (
    <section
      aria-labelledby={`heading-${id}`}
      className={clsx(
        'rounded-2xl sm:rounded-3xl border transition-all duration-200 overflow-hidden',
        variantStyles[variant],
        className
      )}
    >
      {/* Clickable Header Toggle */}
      <button
        type="button"
        id={`heading-${id}`}
        aria-expanded={isOpen}
        aria-controls={`content-${id}`}
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left select-none hover:bg-slate-50/60 active:bg-slate-100/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
          {icon && (
            <div className="shrink-0 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors">
                {title}
              </h3>
              {badge && <div className="shrink-0">{badge}</div>}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 truncate font-normal">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {headerRight && <div onClick={(e) => e.stopPropagation()}>{headerRight}</div>}
          <div
            className={clsx(
              'w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 group-hover:bg-slate-200/70 text-slate-500 group-hover:text-slate-800 transition-all duration-200',
              isOpen && 'rotate-180 bg-brand-50 text-brand-600'
            )}
          >
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          </div>
        </div>
      </button>

      {/* Collapsible Body */}
      {isOpen && (
        <div
          id={`content-${id}`}
          className={clsx(
            'border-t border-slate-100 animate-fade-in',
            !noPadding && 'p-4 sm:p-5 pt-3 sm:pt-4'
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
};
