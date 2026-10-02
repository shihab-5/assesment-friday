'use client';

import React from 'react';
import { DemoStateKey } from '@/types/order';
import {
  Truck,
  AlertTriangle,
  ShieldAlert,
  Clock,
  CheckCircle2,
  ChevronRight,
  GitBranch,
} from 'lucide-react';
import clsx from 'clsx';

interface ScenarioTreeSelectorProps {
  currentState: DemoStateKey;
  onSelectState: (state: DemoStateKey) => void;
}

const scenarioItems = [
  {
    key: 'out_for_delivery' as DemoStateKey,
    title: 'Normal (Out for Delivery)',
    subtitle: 'Active live courier route • Expected 2:00 PM – 5:00 PM',
    icon: Truck,
    color: 'text-brand-600 bg-brand-50 border-brand-200',
    activeBadge: 'Active: Normal Route',
  },
  {
    key: 'delayed' as DemoStateKey,
    title: 'Delayed Order',
    subtitle: 'Delay message + updated delivery (Oct 4) + support CTA',
    icon: AlertTriangle,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    activeBadge: 'Active: Delay State',
  },
  {
    key: 'delivered_not_received' as DemoStateKey,
    title: 'Delivered but Not Received',
    subtitle: 'Delivery photo + discrepancy notice + 1-click issue report flow',
    icon: ShieldAlert,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    activeBadge: 'Active: Discrepancy State',
  },
  {
    key: 'tracking_unavailable' as DemoStateKey,
    title: 'Tracking Not Available Yet',
    subtitle: 'Warehouse packing queue + reassurance + full order summary',
    icon: Clock,
    color: 'text-slate-600 bg-slate-100 border-slate-200',
    activeBadge: 'Active: Pending State',
  },
];

export const ScenarioTreeSelector: React.FC<ScenarioTreeSelectorProps> = ({
  currentState,
  onSelectState,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-1 px-1">
        <span className="font-semibold flex items-center gap-1.5 text-slate-700">
          <GitBranch className="w-3.5 h-3.5 text-brand-600" />
          <span>Select Scenario Branch to Inspect:</span>
        </span>
        <span className="text-[11px] text-slate-400">Tap any state</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {scenarioItems.map((item) => {
          const isSelected = currentState === item.key;
          const IconComp = item.icon;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectState(item.key)}
              className={clsx(
                'w-full flex items-start gap-3 p-3 rounded-2xl border text-left transition-all duration-150 relative overflow-hidden group',
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-slate-900 ring-offset-1'
                  : 'bg-slate-50/70 hover:bg-slate-100/90 text-slate-800 border-slate-200/80'
              )}
            >
              <div
                className={clsx(
                  'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 transition-transform group-hover:scale-105',
                  isSelected
                    ? 'bg-white/15 text-white border-white/20'
                    : item.color
                )}
              >
                <IconComp className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={clsx(
                      'text-xs font-bold leading-tight truncate',
                      isSelected ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {item.title}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold bg-brand-500 text-white px-1.5 py-0.2 rounded-full shrink-0 ml-1">
                      Viewing
                    </span>
                  )}
                </div>
                <p
                  className={clsx(
                    'text-[11px] mt-0.5 leading-snug',
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  )}
                >
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
