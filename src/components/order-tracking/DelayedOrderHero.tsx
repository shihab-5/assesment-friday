'use client';

import React from 'react';
import { AlertTriangle, Clock, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';
import { OrderData } from '@/types/order';
import { Button } from '@/components/common/Button';

interface DelayedOrderHeroProps {
  order: OrderData;
  onContactSupport: () => void;
}

export const DelayedOrderHero: React.FC<DelayedOrderHeroProps> = ({
  order,
  onContactSupport,
}) => {
  return (
    <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-amber-950">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-amber-900 leading-snug">
            Why is my order delayed?
          </h3>
          <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
            {order.delayReason ||
              'Your package encountered a brief transit delay en route. It has been prioritized for the next available dispatch.'}
          </p>

          <div className="mt-3.5 pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-amber-900/80 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Carrier is actively moving this shipment</span>
            </div>
            <button
              onClick={onContactSupport}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/90 hover:bg-amber-200/80 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Get help with delayed order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
