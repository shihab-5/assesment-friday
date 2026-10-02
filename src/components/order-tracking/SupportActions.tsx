'use client';

import React from 'react';
import { MessageSquare, PhoneCall, HelpCircle, AlertCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { OrderData } from '@/types/order';

interface SupportActionsProps {
  order: OrderData;
  onContactSupport: () => void;
  onReportIssue?: () => void;
}

export const SupportActions: React.FC<SupportActionsProps> = ({
  order,
  onContactSupport,
  onReportIssue,
}) => {
  const isProblemState = order.status === 'delayed' || order.status === 'delivered_not_received';

  return (
    <section aria-label="Customer support and help options" className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-subtle space-y-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Need Help with this Order?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Our 24/7 dedicated support team is available to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {/* Contact Support Option */}
          <button
            onClick={onContactSupport}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/80 active:bg-slate-200 transition-all text-left focus:outline-none focus:ring-2 focus:ring-slate-300 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 leading-tight">
                  Contact Support
                </span>
                <span className="block text-[11px] text-slate-500 truncate mt-0.5">
                  Live chat & phone assistance
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 ml-2" />
          </button>

          {/* Delivery Issue Option */}
          {onReportIssue && (
            <button
              onClick={onReportIssue}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/80 active:bg-slate-200 transition-all text-left focus:outline-none focus:ring-2 focus:ring-slate-300 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100 group-hover:scale-105 transition-transform">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-slate-900 leading-tight">
                    Report an Issue
                  </span>
                  <span className="block text-[11px] text-slate-500 truncate mt-0.5">
                    Damaged, delayed or missing
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 ml-2" />
            </button>
          )}

          {/* FAQs & Return policy */}
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              alert('Opening Store FAQ & Return Policy Help Center...');
            }}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/80 active:bg-slate-200 transition-all text-left focus:outline-none focus:ring-2 focus:ring-slate-300 group sm:col-span-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 leading-tight">
                  Frequently Asked Questions
                </span>
                <span className="block text-[11px] text-slate-500 truncate mt-0.5">
                  View shipping windows, carrier policies & returns
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};
