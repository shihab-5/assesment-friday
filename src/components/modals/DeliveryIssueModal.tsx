'use client';

import React, { useState } from 'react';
import { ModalSheet } from '@/components/common/ModalSheet';
import { OrderData } from '@/types/order';
import {
  AlertCircle,
  CheckCircle2,
  PackageX,
  MapPinOff,
  Box,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

interface DeliveryIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData;
  initialReason?: string;
}

const issueOptions = [
  {
    id: 'not_received',
    title: 'Package not received',
    description: 'Marked delivered by carrier but nowhere on property',
    icon: PackageX,
  },
  {
    id: 'wrong_location',
    title: 'Delivered to wrong location',
    description: 'Delivered to wrong house, wrong unit, or unauthorized drop',
    icon: MapPinOff,
  },
  {
    id: 'damaged',
    title: 'Damaged package or contents',
    description: 'Box crushed, wet, torn open, or items broken inside',
    icon: Box,
  },
  {
    id: 'other',
    title: 'Other delivery problem',
    description: 'Missing item from bundle, wrong product, or courier note',
    icon: HelpCircle,
  },
];

export const DeliveryIssueModal: React.FC<DeliveryIssueModalProps> = ({
  isOpen,
  onClose,
  order,
  initialReason = 'not_received',
}) => {
  const [selectedIssue, setSelectedIssue] = useState<string>(initialReason);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [preferredResolution, setPreferredResolution] = useState<'replacement' | 'refund' | 'investigation'>('replacement');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedTicket = 'CASE-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setStep('success');
    }, 800);
  };

  const handleResetAndClose = () => {
    setStep('form');
    setAdditionalNotes('');
    onClose();
  };

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={step === 'form' ? 'Report a Delivery Issue' : 'Issue Report Submitted'}
      subtitle={`Order #${order.orderId}`}
      maxWidth="md"
    >
      {step === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2">
              What issue occurred with this shipment?
            </label>
            <div className="space-y-2">
              {issueOptions.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = selectedIssue === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_issue"
                      value={opt.id}
                      checked={isSelected}
                      onChange={() => setSelectedIssue(opt.id)}
                      className="mt-1 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <IconComponent
                          className={`w-4 h-4 ${
                            isSelected ? 'text-brand-600' : 'text-slate-500'
                          }`}
                        />
                        <span className="text-xs font-bold text-slate-900">
                          {opt.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                        {opt.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Preferred Resolution */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Preferred Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'replacement', label: 'Fast Replacement' },
                { id: 'refund', label: 'Full Refund' },
                { id: 'investigation', label: 'Locate Package' },
              ].map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => setPreferredResolution(res.id as any)}
                  className={`py-2 px-2 text-center rounded-xl border text-[11px] font-semibold transition-all ${
                    preferredResolution === res.id
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {res.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional details */}
          <div>
            <label htmlFor="issue-notes" className="block text-xs font-bold text-slate-900 mb-1">
              Additional Details (optional)
            </label>
            <textarea
              id="issue-notes"
              rows={2}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Looked around porch and neighbor doors, spoke to building super..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={isSubmitting}
            >
              Submit delivery issue report
            </Button>
          </div>
        </form>
      ) : (
        /* Confirmation State */
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Report Successfully Logged
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Case Reference: <span className="font-mono font-bold text-slate-800">{ticketId}</span>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Buyer Protection Active</span>
            </div>
            <p className="leading-relaxed">
              We have opened an official carrier trace with <strong>{order.carrier.name}</strong>. If your package cannot be located within 24 hours, we will immediately process your chosen resolution (<strong>{preferredResolution === 'replacement' ? 'Priority Replacement' : preferredResolution === 'refund' ? 'Full Refund' : 'Courier Investigation'}</strong>).
            </p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
              A summary and tracking link for this case have been emailed to your account.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              size="md"
              onClick={handleResetAndClose}
            >
              Back to tracking
            </Button>
          </div>
        </div>
      )}
    </ModalSheet>
  );
};
