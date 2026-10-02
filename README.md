# Mobile Order Tracking Experience

A production-quality, responsive mobile-first **Order Tracking Experience** designed for modern e-commerce applications. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide React**.

---

## 🎯 UX Philosophy & Design Strategy

The application is architected around answering 5 essential customer questions within 2–3 seconds of opening the screen:
1. **What is the current status?** &rarr; Prominent Hero status badge with dynamic visual mood and courier carrier branding.
2. **Where is my order in the delivery process?** &rarr; 5-step vertical progression timeline with dual-coded status indicators (accessible icons + timestamps + text labels).
3. **When should I receive it?** &rarr; High-hierarchy estimated delivery card with time window and rescheduled dates if delayed.
4. **Is anything wrong?** &rarr; Explicit scenarios for delay notices and delivery discrepancy resolution.
5. **What can I do if there is a problem?** &rarr; Direct 1-click issue reporting flow with buyer protection guarantee and 24/7 support.

---

## 🚀 Key Features & Scenarios

### 1. Happy Path & Core States
- **Out for Delivery (Default)**: In-transit route, assigned courier driver name, expected time window (2:00 PM – 5:00 PM), active milestone ping.
- **Shipped**: Regional sorting transit milestones.
- **Delivered**: Delivery completion with drop-off details.

### 2. Required Special States
- **State 1: Delayed Order (`delayed`)**:
  - Highlights delay reason (weather disruption / reroute).
  - Previous estimate struck-through with prominent updated estimate.
  - Contextual support CTA ("Get help with delayed order").
- **State 2: Delivered but Not Received (`delivered_not_received`)**:
  - Acknowledges discrepancy gracefully.
  - Displays carrier proof-of-delivery photo & dropoff location.
  - Actionable 3-step **"Report a delivery issue"** workflow.
- **State 3: Tracking Not Available Yet (`tracking_unavailable`)**:
  - Prevents the empty / broken UI feeling.
  - Shows confirmed order status, warehouse picking stage, and reassurance on courier scan milestones.

### 3. Loading & Error Handling
- **Loading Skeleton**: Shimmer skeleton layout preserving structure without layout shifts.
- **Error State**: Network fallback with retry button and direct support trigger.

### 4. Interactive Modals & Drawers
- **Order Details Drawer**: Full order breakdown, items, SKU, discounts, shipping, tax, payment method, delivery instructions, and invoice download action.
- **Contact Support**: Interactive simulated Live Chat, phone callback requester, and ticket routing.
- **Report Delivery Issue Flow**: Categorized radio selector (package not received, wrong location, damaged box, other), preferred resolution selector (replacement, refund, trace), and ticket confirmation.

### 5. Mobile-First & Accessibility
- Designed for mobile viewports: **360px, 375px, 390px, 414px, 430px**.
- **No horizontal scrolling**, minimum 44px touch targets.
- Color-vision deficiency friendly: Uses shape, icons, text labels, and `aria-current="step"`.
- Discreet top **Demo State Switcher** for inspecting all scenarios and mobile viewport frame presets.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18, TypeScript)
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Typography & Motion**: Modern system fonts, custom CSS pulse & shimmer animations

---

## 📦 Installation & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Production Build
```bash
npm run build
npm run start
```

---

## 🧪 Testing the Order States

You can test all scenarios via the top **Demo Toolbar** or directly via URL query parameters:

- **Out for Delivery**: `http://localhost:3000/?state=out_for_delivery`
- **Delayed Order**: `http://localhost:3000/?state=delayed`
- **Delivered Not Received**: `http://localhost:3000/?state=delivered_not_received`
- **Tracking Not Available**: `http://localhost:3000/?state=tracking_unavailable`
- **Shipped**: `http://localhost:3000/?state=shipped`
- **Delivered**: `http://localhost:3000/?state=delivered`
- **Loading Skeleton**: `http://localhost:3000/?state=loading`
- **Error State**: `http://localhost:3000/?state=error`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout & mobile viewport config
│   ├── page.tsx                  # Main Order Tracking page controller
│   └── globals.css               # Design tokens, keyframes & shimmers
├── components/
│   ├── common/
│   │   ├── Badge.tsx             # Accessible color-blind friendly status badges
│   │   ├── Button.tsx            # Touch-target optimized buttons with loading state
│   │   ├── Card.tsx              # Clean card surface wrapper
│   │   └── ModalSheet.tsx        # Responsive bottom drawer / modal
│   ├── order-tracking/
│   │   ├── OrderHeader.tsx       # Back button, title, order ID copy & share
│   │   ├── OrderStatusHero.tsx   # Hero status card with carrier branding
│   │   ├── EstimatedDeliveryCard.tsx # Prominent delivery date & window
│   │   ├── DeliveryTimeline.tsx  # 5-step dual-coded progress timeline
│   │   ├── OrderSummaryCard.tsx  # Product thumbnail, quantities, receipt preview
│   │   ├── DelayedOrderHero.tsx  # Delay explanation and reassurance
│   │   ├── DeliveredDiscrepancyHero.tsx # Proof-of-delivery & recovery path
│   │   ├── TrackingUnavailableHero.tsx  # Warehouse preparation & explanation
│   │   ├── SupportActions.tsx    # Support and issue reporting triggers
│   │   ├── LoadingSkeleton.tsx   # Polished shimmer skeleton
│   │   ├── ErrorState.tsx        # Error fallback with retry action
│   │   └── DemoStateSwitcher.tsx # Inspection toolbar & viewport frame presets
│   └── modals/
│       ├── OrderDetailsModal.tsx # Full order receipt & shipping breakdown
│       ├── ContactSupportModal.tsx # Live chat simulation & callback request
│       └── DeliveryIssueModal.tsx# 3-step issue reporting & confirmation
├── data/
│   └── mockOrders.ts             # Realistic e-commerce order scenario datasets
├── types/
│   └── order.ts                  # Comprehensive TypeScript interfaces
└── utils/
    └── formatters.ts             # Currency and string helper utilities
```
