import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { OrderData } from '@/types/order';
import clsx from 'clsx';

interface EstimatedDeliveryCardProps {
  order: OrderData;
}

export const EstimatedDeliveryCard: React.FC<EstimatedDeliveryCardProps> = ({ order }) => {
  const isDelayed = order.status === 'delayed';
  const isDelivered = order.status === 'delivered' || order.status === 'delivered_not_received';
  const isUnavailable = order.status === 'tracking_unavailable';

  return (
    <div
      className={clsx(
        'rounded-2xl p-4 sm:p-5 border transition-all',
        isDelayed
          ? 'bg-amber-50/60 border-amber-200'
          : isDelivered
          ? 'bg-emerald-50/50 border-emerald-200/80'
          : 'bg-white border-slate-200/80 shadow-subtle'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
              isDelayed
                ? 'bg-amber-100 text-amber-700'
                : isDelivered
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-brand-50 text-brand-700'
            )}
          >
            {isDelayed ? (
              <AlertCircle className="w-5 h-5" />
            ) : isDelivered ? (
              <Calendar className="w-5 h-5" />
            ) : (
              <Calendar className="w-5 h-5" />
            )}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {isDelivered ? 'Delivery Date' : 'Estimated Delivery'}
            </span>

            {/* Delay previous estimate vs new estimate */}
            {isDelayed && order.previousEstimatedDelivery && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 line-through">
                  Was: {order.previousEstimatedDelivery}
                </span>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded">
                  Updated
                </span>
              </div>
            )}

            <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <span>{order.estimatedDeliveryFormatted}</span>
            </div>

            {order.estimatedDeliveryWindow && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Window: {order.estimatedDeliveryWindow}</span>
              </div>
            )}
          </div>
        </div>

        {/* Live on-time indicator badge */}
        <div className="shrink-0 text-right">
          {isDelayed ? (
            <span className="inline-flex items-center text-[11px] font-bold text-amber-800 bg-amber-100/90 border border-amber-200 px-2 py-0.5 rounded-md">
              Rescheduled
            </span>
          ) : isDelivered ? (
            <span className="inline-flex items-center text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded-md">
              Completed
            </span>
          ) : isUnavailable ? (
            <span className="inline-flex items-center text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
              Estimated
            </span>
          ) : (
            <span className="inline-flex items-center text-[11px] font-bold text-brand-800 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-md">
              On Schedule
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
