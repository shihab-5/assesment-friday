'use client';

import React from 'react';
import { ArrowLeft, Copy, Check, Share2 } from 'lucide-react';
import { OrderData } from '@/types/order';

interface OrderHeaderProps {
  order?: OrderData | null;
  onBack?: () => void;
  onOpenDetails?: () => void;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({
  order,
  onBack = () => alert('Navigating to orders list...'),
  onOpenDetails,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyOrderId = () => {
    if (!order?.orderId) return;
    navigator.clipboard?.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 transition-shadow">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Go back to previous page"
            className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Order Tracking
            </h1>
            {order && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-medium text-slate-500">
                  {order.orderId}
                </span>
                <button
                  onClick={handleCopyOrderId}
                  aria-label="Copy Order ID"
                  className="text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                  title="Copy Order ID"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {order && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Tracking Order ${order.orderId}`,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  handleCopyOrderId();
                }
              }}
              aria-label="Share tracking link"
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
