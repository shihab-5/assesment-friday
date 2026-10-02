'use client';

import React from 'react';
import { MapPin, Phone, Truck, ShieldCheck, Copy, Check } from 'lucide-react';
import { OrderData } from '@/types/order';

interface DeliveryDetailsCardProps {
  order: OrderData;
}

export const DeliveryDetailsCard: React.FC<DeliveryDetailsCardProps> = ({ order }) => {
  const [copiedTracking, setCopiedTracking] = React.useState(false);

  const handleCopyTracking = () => {
    navigator.clipboard?.writeText(order.carrier.trackingNumber);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="space-y-3.5 text-xs text-slate-600">
      {/* Address & Instructions */}
      <div className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
        <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0 space-y-0.5">
          <p className="font-bold text-slate-900">{order.shippingAddress.recipientName}</p>
          <p>{order.shippingAddress.street} {order.shippingAddress.aptOrSuite}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
          {order.shippingAddress.deliveryInstructions && (
            <p className="text-[11px] text-brand-700 bg-brand-50 border border-brand-100 rounded-md p-1.5 mt-1.5">
              <span className="font-semibold">Note for Driver:</span> {order.shippingAddress.deliveryInstructions}
            </p>
          )}
        </div>
      </div>

      {/* Carrier & Tracking details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Carrier Service</span>
            <span className="font-bold text-slate-800">{order.carrier.name}</span>
          </div>
          {order.carrier.contactPhone && (
            <a
              href={`tel:${order.carrier.contactPhone}`}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-brand-600 hover:border-brand-200 transition-colors"
              title="Call carrier"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Tracking Number</span>
            <span className="font-mono font-bold text-slate-800">{order.carrier.trackingNumber}</span>
          </div>
          <button
            onClick={handleCopyTracking}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-brand-600 hover:border-brand-200 transition-colors"
            title="Copy tracking number"
          >
            {copiedTracking ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
