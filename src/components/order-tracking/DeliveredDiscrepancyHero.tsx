'use client';

import React from 'react';
import { ShieldAlert, Camera, MapPin, AlertCircle, ArrowRight, FileText } from 'lucide-react';
import { OrderData } from '@/types/order';
import { Button } from '@/components/common/Button';

interface DeliveredDiscrepancyHeroProps {
  order: OrderData;
  onReportIssue: () => void;
  onContactSupport: () => void;
}

export const DeliveredDiscrepancyHero: React.FC<DeliveredDiscrepancyHeroProps> = ({
  order,
  onReportIssue,
  onContactSupport,
}) => {
  const proof = order.proofOfDelivery;
  const notice = order.discrepancyNotice;

  return (
    <div className="bg-rose-50/70 border-2 border-rose-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-slate-900 shadow-xs">
      {/* Top Warning Banner */}
      <div className="flex items-start gap-3 pb-4 border-b border-rose-200/70">
        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-rose-950 leading-snug">
            {notice?.headline || "Haven't received your package?"}
          </h3>
          <p className="text-xs text-rose-900/80 mt-1 leading-relaxed">
            {notice?.message ||
              'Your package was marked as delivered by the courier. If you have not found it yet, we are here to help resolve this immediately.'}
          </p>
        </div>
      </div>

      {/* Proof of Delivery Details (if available) */}
      {proof && (
        <div className="mt-4 bg-white/90 rounded-xl p-3.5 border border-rose-100 flex flex-col sm:flex-row gap-3.5 items-start">
          <div className="relative w-full sm:w-28 h-28 sm:h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img
              src={proof.photoUrl}
              alt="Dropoff proof thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-1 left-1 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
              <Camera className="w-2.5 h-2.5" />
              <span>Courier Photo</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>Drop-off details from carrier</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-800">{proof.dropoffLocation}</span>
            </p>
            <p className="text-slate-500">
              Timestamp: <span className="text-slate-700 font-medium">{proof.deliveredAt}</span>
            </p>
            {proof.signedBy && (
              <p className="text-slate-500">
                Signature: <span className="text-slate-700">{proof.signedBy}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Recommended Quick Checks */}
      {notice?.suggestedSteps && (
        <div className="mt-3.5 pt-3 border-t border-rose-200/50">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-900/70 mb-2">
            Suggested quick checks:
          </p>
          <ul className="space-y-1.5 text-xs text-rose-950/85">
            {notice.suggestedSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="mt-4 pt-3 border-t border-rose-200/70 flex flex-col sm:flex-row gap-2.5">
        <Button
          variant="danger"
          fullWidth
          size="md"
          icon={<AlertCircle className="w-4 h-4" />}
          onClick={onReportIssue}
        >
          Report a delivery issue
        </Button>
        <Button
          variant="outline"
          fullWidth
          size="md"
          onClick={onContactSupport}
        >
          Contact support team
        </Button>
      </div>
    </div>
  );
};
