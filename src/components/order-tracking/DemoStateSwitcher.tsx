'use client';

import React, { useState } from 'react';
import { DemoStateKey } from '@/types/order';
import {
  Layers,
  ChevronDown,
  Sparkles,
  Smartphone,
  Maximize2,
  CheckCircle,
  Clock,
  AlertTriangle,
  ShieldAlert,
  Loader2,
  XCircle,
  Truck,
} from 'lucide-react';
import clsx from 'clsx';

interface DemoStateSwitcherProps {
  currentState: DemoStateKey;
  onSelectState: (state: DemoStateKey) => void;
  viewportWidth: 'full' | '360px' | '375px' | '390px' | '414px' | '430px';
  onChangeViewport: (width: 'full' | '360px' | '375px' | '390px' | '414px' | '430px') => void;
}

const stateOptions: { key: DemoStateKey; label: string; tag: string; icon: any; color: string }[] = [
  {
    key: 'out_for_delivery',
    label: 'Out for Delivery (Default)',
    tag: 'Normal Happy Path',
    icon: Truck,
    color: 'text-brand-600',
  },
  {
    key: 'delayed',
    label: 'State 1: Delayed Order',
    tag: 'Transit Delay & Reschedule',
    icon: AlertTriangle,
    color: 'text-amber-600',
  },
  {
    key: 'delivered_not_received',
    label: 'State 2: Delivered Not Received',
    tag: 'Discrepancy & Issue Flow',
    icon: ShieldAlert,
    color: 'text-rose-600',
  },
  {
    key: 'tracking_unavailable',
    label: 'State 3: Tracking Not Available',
    tag: 'Order Confirmed / Pending',
    icon: Clock,
    color: 'text-slate-600',
  },
  {
    key: 'shipped',
    label: 'Shipped (In Transit)',
    tag: 'En Route between Hubs',
    icon: Truck,
    color: 'text-blue-600',
  },
  {
    key: 'delivered',
    label: 'Delivered (Standard Success)',
    tag: 'Delivered to Doorstep',
    icon: CheckCircle,
    color: 'text-emerald-600',
  },
  {
    key: 'loading',
    label: 'Loading Skeleton',
    tag: 'Initial Load State',
    icon: Loader2,
    color: 'text-slate-500',
  },
  {
    key: 'error',
    label: 'Error State',
    tag: 'Network Retry Fallback',
    icon: XCircle,
    color: 'text-rose-500',
  },
];

export const DemoStateSwitcher: React.FC<DemoStateSwitcherProps> = ({
  currentState,
  onSelectState,
  viewportWidth,
  onChangeViewport,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeOption = stateOptions.find((opt) => opt.key === currentState) || stateOptions[0];
  const ActiveIcon = activeOption.icon;

  return (
    <aside aria-label="Demo inspection toolbar" className="sticky top-0 z-40 bg-slate-900 text-white text-xs border-b border-slate-800 shadow-md">
      <div className="max-w-4xl mx-auto px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* State Selector Dropdown */}
        <div className="relative flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Scenario:</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 active:bg-slate-700 text-white px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors font-medium text-xs shadow-xs"
          >
            <ActiveIcon className={clsx('w-3.5 h-3.5', activeOption.color)} />
            <span className="truncate max-w-[170px] sm:max-w-none">{activeOption.label}</span>
            <ChevronDown className={clsx('w-3.5 h-3.5 text-slate-400 transition-transform', isOpen && 'rotate-180')} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute left-0 top-full mt-1.5 w-72 sm:w-80 bg-slate-900 border border-slate-700/90 rounded-xl shadow-float p-1.5 z-50 animate-fade-in divide-y divide-slate-800">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Order State Scenario
                </div>
                <div className="py-1 space-y-0.5">
                  {stateOptions.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = opt.key === currentState;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          onSelectState(opt.key);
                          setIsOpen(false);
                        }}
                        className={clsx(
                          'w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors',
                          isSelected
                            ? 'bg-brand-600/20 text-brand-300 border border-brand-500/40'
                            : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                        )}
                      >
                        <IconComp className={clsx('w-4 h-4 mt-0.5 shrink-0', opt.color)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs leading-tight">{opt.label}</span>
                            {isSelected && (
                              <span className="text-[10px] font-bold bg-brand-500 text-white px-1.5 py-0.2 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {opt.tag}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Viewport Simulation Width Switcher (for desktop testing) */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
          <span className="text-[10px] font-bold text-slate-400 px-2 flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-slate-400" />
            <span>Frame:</span>
          </span>
          {(['360px', '375px', '390px', '414px', '430px', 'full'] as const).map((width) => (
            <button
              key={width}
              onClick={() => onChangeViewport(width)}
              className={clsx(
                'px-2 py-1 text-[11px] font-medium rounded-md transition-all',
                viewportWidth === width
                  ? 'bg-brand-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              )}
            >
              {width === 'full' ? 'Responsive' : width}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
