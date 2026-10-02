'use client';

import React from 'react';
import {
  Check,
  Circle,
  Truck,
  Package,
  AlertTriangle,
  Clock,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import { TimelineStep, TimelineStepStatus } from '@/types/order';
import clsx from 'clsx';

interface DeliveryTimelineProps {
  steps: TimelineStep[];
  isDelayed?: boolean;
}

export const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ steps, isDelayed }) => {
  const getStepIcon = (step: TimelineStep) => {
    switch (step.status) {
      case 'completed':
        return <Check className="w-3.5 h-3.5 text-white stroke-[3]" />;
      case 'current':
        return <Truck className="w-4 h-4 text-brand-600" />;
      case 'delayed':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'upcoming':
      default:
        return <Circle className="w-2.5 h-2.5 text-slate-300 fill-slate-300" />;
    }
  };

  const getStepNodeStyle = (status: TimelineStepStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-slate-900 border-slate-900 text-white shadow-xs';
      case 'current':
        return 'bg-white border-2 border-brand-500 text-brand-600 ring-4 ring-brand-100/80 animate-pulse-ring';
      case 'delayed':
        return 'bg-amber-100 border-2 border-amber-500 text-amber-800 ring-4 ring-amber-100';
      case 'alert':
        return 'bg-rose-100 border-2 border-rose-500 text-rose-700 ring-4 ring-rose-100';
      case 'upcoming':
      default:
        return 'bg-white border-2 border-slate-200 text-slate-300';
    }
  };

  return (
    <section aria-label="Delivery progress timeline" className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-subtle">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <span>Delivery Progress</span>
            {isDelayed && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full lowercase first-letter:uppercase">
                delayed step noted
              </span>
            )}
          </h3>
          <span className="text-xs text-slate-400 font-medium">5 Steps</span>
        </div>

        {/* Timeline list */}
        <div className="relative pl-2">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isCurrent = step.status === 'current' || step.status === 'delayed' || step.status === 'alert';
            const isCompleted = step.status === 'completed';

            return (
              <div
                key={step.id || index}
                className="relative flex items-start gap-4 pb-6 last:pb-1 group"
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Vertical connecting line */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className={clsx(
                      'absolute left-[13px] top-[26px] bottom-0 w-[2px] -ml-[1px] transition-colors',
                      isCompleted
                        ? 'bg-slate-900'
                        : isCurrent
                        ? 'bg-gradient-to-b from-brand-500 to-slate-200'
                        : 'bg-slate-200'
                    )}
                  />
                )}

                {/* Node icon */}
                <div
                  className={clsx(
                    'relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform',
                    getStepNodeStyle(step.status)
                  )}
                >
                  {getStepIcon(step)}
                </div>

                {/* Step content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={clsx(
                          'text-sm leading-tight transition-colors',
                          isCurrent
                            ? 'font-bold text-slate-900'
                            : isCompleted
                            ? 'font-semibold text-slate-800'
                            : 'font-medium text-slate-400'
                        )}
                      >
                        {step.title}
                      </p>
                      {step.badge && (
                        <span
                          className={clsx(
                            'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                            step.status === 'delayed'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : step.status === 'alert'
                              ? 'bg-rose-100 text-rose-800 border-rose-200'
                              : 'bg-brand-50 text-brand-700 border-brand-200'
                          )}
                        >
                          {step.badge}
                        </span>
                      )}
                    </div>

                    {/* Step Timestamp */}
                    {step.timestamp && (
                      <span
                        className={clsx(
                          'text-xs whitespace-nowrap',
                          isCurrent
                            ? 'font-bold text-brand-700'
                            : isCompleted
                            ? 'font-medium text-slate-500'
                            : 'text-slate-400'
                        )}
                      >
                        {step.timestamp}
                      </span>
                    )}
                  </div>

                  {/* Step Description */}
                  <p
                    className={clsx(
                      'text-xs mt-1 leading-relaxed',
                      isCurrent
                        ? 'text-slate-700 font-medium'
                        : isCompleted
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    )}
                  >
                    {step.description}
                  </p>

                  {/* Optional Location badge */}
                  {step.location && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{step.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
