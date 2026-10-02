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
import { CollapsibleSection } from '@/components/common/CollapsibleSection';
import { DeliveryDetailsCard } from '@/components/order-tracking/DeliveryDetailsCard';
import { ScenarioTreeSelector } from '@/components/order-tracking/ScenarioTreeSelector';
import {
  Truck,
  Calendar,
  Clock,
  Package,
  MapPin,
  HelpCircle,
  GitBranch,
  ChevronsUpDown,
  ChevronsDownUp,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import clsx from 'clsx';

export default function OrderTrackingPage() {
  const [demoState, setDemoState] = useState<DemoStateKey>('out_for_delivery');
  const [viewportWidth, setViewportWidth] = useState<'full' | '360px' | '375px' | '390px' | '414px' | '430px'>('full');
  
  // Section collapsible state tracking (all open by default, can be toggled individually)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    scenario_tree: false, // collapsed by default to keep screen focused, expandable anytime
    status_hero: true,
    special_notice: true,
    estimated_delivery: true,
    delivery_timeline: true,
    package_contents: true,
    shipping_destination: true,
    support_actions: true,
  });

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

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const toggleAllSections = (expand: boolean) => {
    setOpenSections({
      scenario_tree: expand,
      status_hero: expand,
      special_notice: expand,
      estimated_delivery: expand,
      delivery_timeline: expand,
      package_contents: expand,
      shipping_destination: expand,
      support_actions: expand,
    });
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

          {/* Quick Section Controls Bar */}
          <div className="px-4 pt-3 pb-1 flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 bg-slate-50/50">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <span>Order Tracking Overview</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleAllSections(true)}
                className="hover:text-brand-600 font-medium transition-colors flex items-center gap-1"
                title="Expand all sections"
              >
                <ChevronsUpDown className="w-3 h-3" />
                <span>Expand All</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => toggleAllSections(false)}
                className="hover:text-brand-600 font-medium transition-colors flex items-center gap-1"
                title="Collapse all sections"
              >
                <ChevronsDownUp className="w-3 h-3" />
                <span>Collapse All</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 px-4 py-4 sm:px-5 sm:py-5 space-y-3.5">
            {demoState === 'loading' ? (
              <LoadingSkeleton />
            ) : demoState === 'error' ? (
              <ErrorState
                onRetry={handleRetry}
                onContactSupport={() => setIsSupportOpen(true)}
              />
            ) : currentOrder ? (
              <>
                {/* 0. Collapsible Scenario Tree Navigator */}
                <CollapsibleSection
                  id="scenario_tree"
                  title="Scenario Navigator"
                  subtitle={`Active: ${currentOrder.statusTitle}`}
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
                      <GitBranch className="w-4 h-4" />
                    </div>
                  }
                  isOpen={openSections.scenario_tree}
                  onToggle={() => toggleSection('scenario_tree')}
                  variant="muted"
                >
                  <ScenarioTreeSelector
                    currentState={demoState}
                    onSelectState={handleStateChange}
                  />
                </CollapsibleSection>

                {/* 1. Collapsible Hero Status Card */}
                <CollapsibleSection
                  id="status_hero"
                  title="Current Status"
                  subtitle={currentOrder.statusTitle}
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
                      <Truck className="w-4 h-4" />
                    </div>
                  }
                  badge={
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">
                      {currentOrder.statusBadgeText || 'Active'}
                    </span>
                  }
                  isOpen={openSections.status_hero}
                  onToggle={() => toggleSection('status_hero')}
                  variant="highlight"
                  noPadding
                >
                  <div className="p-1">
                    <OrderStatusHero order={currentOrder} />
                  </div>
                </CollapsibleSection>

                {/* 2. Special State Specific Callouts (with individual toggles) */}
                {demoState === 'delayed' && (
                  <CollapsibleSection
                    id="special_notice"
                    title="Delay Notice & Assistance"
                    subtitle="Carrier delay recorded in transit"
                    icon={
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    }
                    isOpen={openSections.special_notice}
                    onToggle={() => toggleSection('special_notice')}
                    variant="warning"
                    noPadding
                  >
                    <DelayedOrderHero
                      order={currentOrder}
                      onContactSupport={() => setIsSupportOpen(true)}
                    />
                  </CollapsibleSection>
                )}

                {demoState === 'delivered_not_received' && (
                  <CollapsibleSection
                    id="special_notice"
                    title="Discrepancy & Issue Resolution"
                    subtitle="Package marked delivered but not received"
                    icon={
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-200">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                    }
                    isOpen={openSections.special_notice}
                    onToggle={() => toggleSection('special_notice')}
                    variant="danger"
                    noPadding
                  >
                    <DeliveredDiscrepancyHero
                      order={currentOrder}
                      onReportIssue={() => setIsIssueOpen(true)}
                      onContactSupport={() => setIsSupportOpen(true)}
                    />
                  </CollapsibleSection>
                )}

                {demoState === 'tracking_unavailable' && (
                  <CollapsibleSection
                    id="special_notice"
                    title="Fulfillment Status"
                    subtitle="Order confirmed & packing in warehouse"
                    icon={
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                        <Clock className="w-4 h-4" />
                      </div>
                    }
                    isOpen={openSections.special_notice}
                    onToggle={() => toggleSection('special_notice')}
                    variant="muted"
                    noPadding
                  >
                    <TrackingUnavailableHero
                      order={currentOrder}
                      onContactSupport={() => setIsSupportOpen(true)}
                    />
                  </CollapsibleSection>
                )}

                {/* 3. Collapsible Estimated Delivery Card */}
                <CollapsibleSection
                  id="estimated_delivery"
                  title="Estimated Delivery"
                  subtitle={currentOrder.estimatedDeliveryFormatted}
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <Calendar className="w-4 h-4" />
                    </div>
                  }
                  isOpen={openSections.estimated_delivery}
                  onToggle={() => toggleSection('estimated_delivery')}
                  noPadding
                >
                  <EstimatedDeliveryCard order={currentOrder} />
                </CollapsibleSection>

                {/* 4. Collapsible Delivery Progress Timeline */}
                <CollapsibleSection
                  id="delivery_timeline"
                  title="Delivery Progress Timeline"
                  subtitle="5-stage milestone tracking"
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                      <Clock className="w-4 h-4" />
                    </div>
                  }
                  isOpen={openSections.delivery_timeline}
                  onToggle={() => toggleSection('delivery_timeline')}
                  noPadding
                >
                  <DeliveryTimeline
                    steps={currentOrder.timeline}
                    isDelayed={demoState === 'delayed'}
                  />
                </CollapsibleSection>

                {/* 5. Collapsible Package Contents Summary */}
                <CollapsibleSection
                  id="package_contents"
                  title="Package Contents"
                  subtitle={`${currentOrder.products.length} item(s) • Order #${currentOrder.orderId}`}
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
                      <Package className="w-4 h-4" />
                    </div>
                  }
                  isOpen={openSections.package_contents}
                  onToggle={() => toggleSection('package_contents')}
                  noPadding
                >
                  <OrderSummaryCard
                    order={currentOrder}
                    onViewDetails={() => setIsDetailsOpen(true)}
                  />
                </CollapsibleSection>

                {/* 6. Collapsible Shipping Address & Carrier Info */}
                <CollapsibleSection
                  id="shipping_destination"
                  title="Shipping & Destination Details"
                  subtitle={`${currentOrder.shippingAddress.city}, ${currentOrder.shippingAddress.state}`}
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                  }
                  isOpen={openSections.shipping_destination}
                  onToggle={() => toggleSection('shipping_destination')}
                >
                  <DeliveryDetailsCard order={currentOrder} />
                </CollapsibleSection>

                {/* 7. Collapsible Support & Help Suite */}
                <CollapsibleSection
                  id="support_actions"
                  title="Support & Assistance"
                  subtitle="24/7 dedicated resolution team"
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                  }
                  isOpen={openSections.support_actions}
                  onToggle={() => toggleSection('support_actions')}
                  noPadding
                >
                  <SupportActions
                    order={currentOrder}
                    onContactSupport={() => setIsSupportOpen(true)}
                    onReportIssue={
                      demoState === 'delivered_not_received' || demoState === 'delayed'
                        ? () => setIsIssueOpen(true)
                        : undefined
                    }
                  />
                </CollapsibleSection>
              </>
            ) : null}
          </div>

          {/* Footer Safe Area */}
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
