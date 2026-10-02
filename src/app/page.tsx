'use client';

import React, { useState, useEffect } from 'react';
import { DemoStateKey } from '@/types/order';
import { mockOrdersData } from '@/data/mockOrders';
import { OrderHeader } from '@/components/order-tracking/OrderHeader';
import { OrderStatusHero } from '@/components/order-tracking/OrderStatusHero';
import { EstimatedDeliveryCard } from '@/components/order-tracking/EstimatedDeliveryCard';
import { DeliveryTimeline } from '@/components/order-tracking/DeliveryTimeline';
import { OrderSummaryCard } from '@/components/order-tracking/OrderSummaryCard';
import { SupportActions } from '@/components/order-tracking/SupportActions';
import { DelayedOrderHero } from '@/components/order-tracking/DelayedOrderHero';
import { DeliveredDiscrepancyHero } from '@/components/order-tracking/DeliveredDiscrepancyHero';
import { TrackingUnavailableHero } from '@/components/order-tracking/TrackingUnavailableHero';
import { LoadingSkeleton } from '@/components/order-tracking/LoadingSkeleton';
import { ErrorState } from '@/components/order-tracking/ErrorState';
import { DemoStateSwitcher } from '@/components/order-tracking/DemoStateSwitcher';
import { OrderDetailsModal } from '@/components/modals/OrderDetailsModal';
import { ContactSupportModal } from '@/components/modals/ContactSupportModal';
import { DeliveryIssueModal } from '@/components/modals/DeliveryIssueModal';
import clsx from 'clsx';

export default function OrderTrackingPage() {
  const [demoState, setDemoState] = useState<DemoStateKey>('out_for_delivery');
  const [viewportWidth, setViewportWidth] = useState<'full' | '360px' | '375px' | '390px' | '414px' | '430px'>('full');
  
  // Modals state
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);

  // Allow URL query params (?state=delayed or ?state=delivered_not_received etc)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const stateParam = params.get('state') as DemoStateKey;
      if (stateParam && mockOrdersData[stateParam] !== undefined) {
        setDemoState(stateParam);
      }
    }
  }, []);

  const currentOrder = mockOrdersData[demoState];

  const handleStateChange = (newState: DemoStateKey) => {
    setDemoState(newState);
  };

  const handleRetry = () => {
    setDemoState('loading');
    setTimeout(() => {
      setDemoState('out_for_delivery');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Demo Inspection Bar */}
      <DemoStateSwitcher
        currentState={demoState}
        onSelectState={handleStateChange}
        viewportWidth={viewportWidth}
        onChangeViewport={setViewportWidth}
      />

      {/* Main Container / Mobile Device Simulation Wrapper */}
      <main className="flex-1 flex justify-center py-0 sm:py-6 px-0 sm:px-4">
        <div
          style={
            viewportWidth !== 'full'
              ? { width: viewportWidth, maxWidth: '100%' }
              : undefined
          }
          className={clsx(
            'w-full bg-white transition-all duration-300 min-h-[92vh] flex flex-col',
            viewportWidth === 'full'
              ? 'max-w-xl sm:rounded-3xl sm:shadow-card sm:border sm:border-slate-200/80 sm:overflow-hidden'
              : 'shadow-2xl rounded-3xl border border-slate-300 overflow-hidden my-auto'
          )}
        >
          {/* Header */}
          <OrderHeader
            order={currentOrder}
            onBack={() => {
              if (demoState !== 'out_for_delivery') {
                setDemoState('out_for_delivery');
              } else {
                alert('Navigating back to order history.');
              }
            }}
            onOpenDetails={() => currentOrder && setIsDetailsOpen(true)}
          />

          {/* Body Content */}
          <div className="flex-1 px-4 py-4 sm:px-5 sm:py-5 space-y-4">
            {demoState === 'loading' ? (
              <LoadingSkeleton />
            ) : demoState === 'error' ? (
              <ErrorState
                onRetry={handleRetry}
                onContactSupport={() => setIsSupportOpen(true)}
              />
            ) : currentOrder ? (
              <>
                {/* 1. Status Hero */}
                <OrderStatusHero order={currentOrder} />

                {/* 2. Special State Specific Callouts */}
                {demoState === 'delayed' && (
                  <DelayedOrderHero
                    order={currentOrder}
                    onContactSupport={() => setIsSupportOpen(true)}
                  />
                )}

                {demoState === 'delivered_not_received' && (
                  <DeliveredDiscrepancyHero
                    order={currentOrder}
                    onReportIssue={() => setIsIssueOpen(true)}
                    onContactSupport={() => setIsSupportOpen(true)}
                  />
                )}

                {demoState === 'tracking_unavailable' && (
                  <TrackingUnavailableHero
                    order={currentOrder}
                    onContactSupport={() => setIsSupportOpen(true)}
                  />
                )}

                {/* 3. Estimated Delivery Card (Always displayed for clear expectation) */}
                <EstimatedDeliveryCard order={currentOrder} />

                {/* 4. Delivery Progress Timeline */}
                <DeliveryTimeline
                  steps={currentOrder.timeline}
                  isDelayed={demoState === 'delayed'}
                />

                {/* 5. Package Contents Summary */}
                <OrderSummaryCard
                  order={currentOrder}
                  onViewDetails={() => setIsDetailsOpen(true)}
                />

                {/* 6. Support & Resolution Actions */}
                <SupportActions
                  order={currentOrder}
                  onContactSupport={() => setIsSupportOpen(true)}
                  onReportIssue={
                    demoState === 'delivered_not_received' || demoState === 'delayed'
                      ? () => setIsIssueOpen(true)
                      : undefined
                  }
                />
              </>
            ) : null}
          </div>

          {/* Footer Safe Area / Copyright */}
          <footer className="px-5 py-4 text-center text-[11px] text-slate-400 border-t border-slate-100 bg-slate-50/50 mt-auto">
            <p>SwiftExpress Verified Courier Tracking • SSL Encrypted</p>
          </footer>
        </div>
      </main>

      {/* Interactive Modals */}
      {currentOrder && (
        <>
          <OrderDetailsModal
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            order={currentOrder}
          />

          <ContactSupportModal
            isOpen={isSupportOpen}
            onClose={() => setIsSupportOpen(false)}
            order={currentOrder}
          />

          <DeliveryIssueModal
            isOpen={isIssueOpen}
            onClose={() => setIsIssueOpen(false)}
            order={currentOrder}
            initialReason={
              demoState === 'delivered_not_received'
                ? 'not_received'
                : demoState === 'delayed'
                ? 'other'
                : 'not_received'
            }
          />
        </>
      )}
    </div>
  );
}
