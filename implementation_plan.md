# Implementation Plan: Mobile Order Tracking Experience

## 1. Executive Summary & Goals
Build a production-quality, responsive mobile-first Order Tracking experience for e-commerce with Next.js (App Router), TypeScript, Tailwind CSS, and Lucide React.
The interface solves user uncertainty within 2–3 seconds by clearly answering:
1. Current status
2. Progress in delivery process
3. Estimated delivery time
4. Anomaly / issue status (delays, discrepancies)
5. Actionable next steps (support, reporting issue, full receipt details)

---

## 2. Technical Stack & Architecture
- **Framework**: Next.js 14 / 15 (React 18 / 19, TypeScript, App Router)
- **Styling**: Tailwind CSS + Custom CSS Variables & Animations (Accessible tokens, smooth transitions, mobile safe-area insets)
- **Icons**: Lucide React
- **Mock State Engine**: Type-safe state management (`useOrderTrackingState`) with instant switcher for all 6 required demo states:
  - Normal (Out for Delivery)
  - Normal (Shipped / Processing / Delivered)
  - State 1: Delayed Order
  - State 2: Delivered but Not Received (Discrepancy & Issue Resolution)
  - State 3: Tracking Not Available Yet (Order confirmed, awaiting courier handoff)
  - Extra 1: Loading Skeleton state
  - Extra 2: Error state with retry action

---

## 3. Directory Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── common/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ModalSheet.tsx
│   ├── order-tracking/
│   │   ├── OrderHeader.tsx
│   │   ├── OrderStatusHero.tsx
│   │   ├── DeliveryTimeline.tsx
│   │   ├── EstimatedDeliveryCard.tsx
│   │   ├── OrderSummaryCard.tsx
│   │   ├── SupportActions.tsx
│   │   ├── TrackingUnavailableHero.tsx
│   │   ├── DelayedOrderHero.tsx
│   │   ├── DeliveredDiscrepancyHero.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ErrorState.tsx
│   │   └── DemoStateSwitcher.tsx
│   └── modals/
│       ├── OrderDetailsModal.tsx
│       ├── ContactSupportModal.tsx
│       └── DeliveryIssueModal.tsx
├── data/
│   └── mockOrders.ts
├── types/
│   └── order.ts
└── utils/
    └── formatters.ts
```

---

## 4. Key UX & Accessibility Features
- **High Contrast & Dual Coding**: Icons + text badges + aria-current status (not relying on color alone for red/green/yellow).
- **Mobile-First Responsive Layout**: Optimized for 360px, 375px, 390px, 414px, 430px, and tablet/desktop viewport preview container.
- **Interactive Sheets / Modals**:
  - Full Order Details (items breakdown, taxes, shipping, payment method, delivery instructions, shipping address).
  - Support modal (instant live chat simulation, phone callback, email ticket).
  - Issue Reporting Flow (step 1: category selection, step 2: specific details, step 3: instant submission confirmation with reference ticket ID).
- **Demo State Switcher**: Floating pill / top discreet toggle allowing evaluators to switch states or simulate live loading/error.

---

## 5. Execution Steps
1. Initialize Next.js project with Tailwind CSS & TypeScript in current directory.
2. Install `lucide-react` and necessary helper packages (`clsx`, `tailwind-merge`).
3. Build comprehensive data models (`types/order.ts`) and mock scenarios (`data/mockOrders.ts`).
4. Build core UI components:
   - Header, Status Hero, Timeline, Estimated Delivery, Product Summary, Support & Action buttons.
5. Build dedicated state variations:
   - Delayed Order with timeline badge and support CTA.
   - Delivered but Not Received with proof-of-delivery mockup and Report Issue trigger.
   - Tracking Not Available with processing state & clear explanation.
   - Polished Skeleton Loading & Error with retry.
6. Build Interactive Modals:
   - Order Details Modal
   - Contact Support Modal
   - Report Delivery Issue Modal with 3-step resolution.
7. Build responsive viewport frame switcher / demo bar for desktop inspection + true mobile rendering.
8. Type-check, lint, build test, and execute Visual QA across 360px, 375px, 390px, 414px, 430px.
