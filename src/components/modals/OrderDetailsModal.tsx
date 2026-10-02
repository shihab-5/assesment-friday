'use client';

import React from 'react';
import { ModalSheet } from '@/components/common/ModalSheet';
import { OrderData } from '@/types/order';
import { formatCurrency } from '@/utils/formatters';
import { MapPin, CreditCard, Truck, Package, ShieldCheck, Download } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Order Details"
      subtitle={`Order #${order.orderId} • Placed on ${order.orderDate}`}
      maxWidth="md"
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => alert('Downloading PDF invoice receipt...')}
          >
            Invoice (PDF)
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      }
    >
      <div className="space-y-5 text-slate-800">
        {/* Items List */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Items in this Shipment ({order.products.length})
          </h4>
          <div className="space-y-3 divide-y divide-slate-100">
            {order.products.map((item) => (
              <div key={item.id} className="pt-2.5 first:pt-0 flex items-start gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {item.name}
                  </p>
                  {item.variant && (
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.variant}</p>
                  )}
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">SKU: {item.sku}</p>
                  <div className="flex justify-between items-baseline mt-1">
                    <span className="text-xs text-slate-600">Qty: {item.quantity}</span>
                    <span className="text-xs font-bold text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Shipping Address</span>
          </h4>
          <div className="text-xs text-slate-600 space-y-0.5 leading-relaxed">
            <p className="font-semibold text-slate-900">{order.shippingAddress.recipientName}</p>
            <p>{order.shippingAddress.street}</p>
            {order.shippingAddress.aptOrSuite && <p>{order.shippingAddress.aptOrSuite}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            {order.shippingAddress.deliveryInstructions && (
              <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Instructions: </span>
                {order.shippingAddress.deliveryInstructions}
              </div>
            )}
          </div>
        </div>

        {/* Carrier Info */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
            <Truck className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Carrier Information</span>
          </h4>
          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Carrier:</span>
              <span className="font-semibold text-slate-800">{order.carrier.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="text-slate-700">{order.carrier.serviceLevel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Tracking #:</span>
              <span className="font-mono text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                {order.carrier.trackingNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(order.pricing.subtotal)}</span>
          </div>
          {order.pricing.discount && order.pricing.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Promotional Discount</span>
              <span>-{formatCurrency(order.pricing.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span>
              {order.pricing.shipping === 0 ? (
                <span className="text-emerald-700 font-semibold">FREE</span>
              ) : (
                formatCurrency(order.pricing.shipping)
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Sales Tax</span>
            <span>{formatCurrency(order.pricing.tax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
            <span>Total Paid</span>
            <span>{formatCurrency(order.pricing.total)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Payment method:</span>
            <span className="font-medium text-slate-700">{order.pricing.paymentMethod}</span>
          </div>
        </div>
      </div>
    </ModalSheet>
  );
};
