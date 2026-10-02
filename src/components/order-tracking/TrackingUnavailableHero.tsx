'use client';

import React from 'react';
import { PackageCheck, Clock, Bell, Info, ArrowRight } from 'lucide-react';
import { OrderData } from '@/types/order';
import { Button } from '@/components/common/Button';

interface TrackingUnavailableHeroProps {
  order: OrderData;
  onContactSupport: () => void;
}

export const TrackingUnavailableHero: React.FC<TrackingUnavailableHeroProps> = ({
  order,
  onContactSupport,
}) => {
  const notice = order.trackingUnavailableNotice;

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-slate-800 shadow-subtle">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 border border-brand-100">
          <Clock className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            {notice?.headline || 'What happens next?'}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {notice?.message ||
              'Your order is confirmed and is currently being packed in our warehouse. Real-time courier tracking milestones will activate as soon as the carrier scans the parcel.'}
          </p>

          <div className="mt-3 bg-white p-3 rounded-xl border border-slate-200/70 flex items-start gap-2.5 text-xs text-slate-600">
            <Bell className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p>
              {notice?.actionAdvice ||
                'We will automatically email and text you as soon as the delivery vehicle departs.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need immediate help?</span>
            <button
              onClick={onContactSupport}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
            >
              <span>Contact customer care</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
