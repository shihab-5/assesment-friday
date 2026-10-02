'use client';

import React from 'react';
import Image from 'next/image';
import { Package, ChevronRight, Receipt } from 'lucide-react';
import { OrderData } from '@/types/order';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/common/Button';

interface OrderSummaryCardProps {
  order: OrderData;
  onViewDetails: () => void;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  order,
  onViewDetails,
}) => {
  const mainProduct = order.products[0];
  const totalItemCount = order.products.reduce((acc, item) => acc + item.quantity, 0);
  const additionalCount = order.products.length - 1;

  return (
    <section aria-label="Order summary" className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-subtle">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Package Contents
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Order #{order.orderId} • {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
            {order.orderDate}
          </span>
        </div>

        {/* Primary Product Card */}
        {mainProduct && (
          <div className="flex items-center gap-3.5 py-1">
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/70 shrink-0">
              <img
                src={mainProduct.imageUrl}
                alt={mainProduct.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-1 right-1 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                x{mainProduct.quantity}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                {mainProduct.name}
              </h4>
              {mainProduct.variant && (
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {mainProduct.variant}
                </p>
              )}
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-slate-500">
                  Qty {mainProduct.quantity}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {formatCurrency(mainProduct.price * mainProduct.quantity)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Additional items teaser */}
        {additionalCount > 0 && (
          <div className="mt-3 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>+{additionalCount} more item in this shipment</span>
            <span className="font-semibold text-brand-600">Included</span>
          </div>
        )}

        {/* Action Button: View Order Details */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={onViewDetails}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200/80 text-slate-800 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-slate-500" />
              <span>View full order receipt & details</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
