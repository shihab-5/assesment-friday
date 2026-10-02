'use client';

import React from 'react';
import { Truck, Package, Clock, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { OrderData, OrderStatusType } from '@/types/order';
import { Badge } from '@/components/common/Badge';
import clsx from 'clsx';

interface OrderStatusHeroProps {
  order: OrderData;
}

export const OrderStatusHero: React.FC<OrderStatusHeroProps> = ({ order }) => {
  const getStatusVisuals = (status: OrderStatusType) => {
    switch (status) {
      case 'out_for_delivery':
        return {
          icon: <Truck className="w-7 h-7 text-brand-600 animate-car-bounce" />,
          iconBg: 'bg-brand-100/80 border-brand-200 text-brand-700',
          badgeVariant: 'brand' as const,
          containerBg: 'from-brand-50/70 via-white to-white border-brand-200/60',
          indicatorColor: 'bg-brand-500',
          accentText: 'text-brand-700',
        };
      case 'delayed':
        return {
          icon: <AlertTriangle className="w-7 h-7 text-amber-600 animate-pulse" />,
          iconBg: 'bg-amber-100/90 border-amber-300 text-amber-800',
          badgeVariant: 'warning' as const,
          containerBg: 'from-amber-50/80 via-white to-white border-amber-200/80',
          indicatorColor: 'bg-amber-500',
          accentText: 'text-amber-800',
        };
      case 'delivered_not_received':
        return {
          icon: <ShieldAlert className="w-7 h-7 text-rose-600" />,
          iconBg: 'bg-rose-100/90 border-rose-200 text-rose-700',
          badgeVariant: 'danger' as const,
          containerBg: 'from-rose-50/60 via-white to-white border-rose-200/80',
          indicatorColor: 'bg-rose-500',
          accentText: 'text-rose-700',
        };
      case 'delivered':
        return {
          icon: <CheckCircle2 className="w-7 h-7 text-emerald-600" />,
          iconBg: 'bg-emerald-100/80 border-emerald-200 text-emerald-700',
          badgeVariant: 'success' as const,
          containerBg: 'from-emerald-50/60 via-white to-white border-emerald-200/60',
          indicatorColor: 'bg-emerald-500',
          accentText: 'text-emerald-700',
        };
      case 'shipped':
        return {
          icon: <Truck className="w-7 h-7 text-brand-600" />,
          iconBg: 'bg-blue-100/80 border-blue-200 text-blue-700',
          badgeVariant: 'brand' as const,
          containerBg: 'from-blue-50/60 via-white to-white border-blue-200/60',
          indicatorColor: 'bg-blue-500',
          accentText: 'text-blue-700',
        };
      case 'tracking_unavailable':
      case 'processing':
      default:
        return {
          icon: <Clock className="w-7 h-7 text-slate-700" />,
          iconBg: 'bg-slate-100 border-slate-200 text-slate-700',
          badgeVariant: 'neutral' as const,
          containerBg: 'from-slate-100/70 via-white to-white border-slate-200/70',
          indicatorColor: 'bg-slate-400',
          accentText: 'text-slate-700',
        };
    }
  };

  const visuals = getStatusVisuals(order.status);

  return (
    <section aria-labelledby="order-status-heading" className="w-full">
      <div
        className={clsx(
          'relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-b border shadow-subtle overflow-hidden',
          visuals.containerBg
        )}
      >
        {/* Subtle decorative background blur spot */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-gradient-to-br from-white/60 to-transparent rounded-full pointer-events-none blur-xl" />

        <div className="relative flex flex-col gap-3.5">
          {/* Top Row: Live badge & Status Icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span
                  className={clsx(
                    'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                    visuals.indicatorColor
                  )}
                />
                <span
                  className={clsx(
                    'relative inline-flex rounded-full h-2.5 w-2.5',
                    visuals.indicatorColor
                  )}
                />
              </span>
              <Badge variant={visuals.badgeVariant} size="sm">
                {order.statusBadgeText || 'Status Update'}
              </Badge>
            </div>

            {/* Carrier pill */}
            <div className="text-[11px] font-medium text-slate-500 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              {order.carrier.name}
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="flex items-start gap-4">
            <div
              className={clsx(
                'shrink-0 w-13 h-13 rounded-2xl flex items-center justify-center border shadow-xs transition-transform',
                visuals.iconBg
              )}
            >
              {visuals.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="order-status-heading"
                className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight"
              >
                {order.statusTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {order.statusSubtitle}
              </p>
            </div>
          </div>

          {/* Additional context strip if available */}
          {order.carrier.driverName && (
            <div className="mt-1 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
              <span className="text-slate-500">Assigned Driver:</span>
              <span className="font-semibold text-slate-800">{order.carrier.driverName}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
