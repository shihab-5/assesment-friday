# AI Prompt History

This document logs all user prompts and instructions received during the development of the Mobile Order Tracking experience.

---

## Prompt 1 - Initial Specification & Requirements
**Timestamp:** 2026-10-02T10:17:17+06:00

**Prompt Content:**
```markdown
# Role

Act as a **Senior Frontend Engineer, UI/UX Designer, and Frontend QA Engineer**.

I need you to design and implement a **production-quality mobile Order Tracking experience for an e-commerce application**.

This is a frontend assessment, so the result must look like a real commercial product rather than a basic demo.

---

# Assignment

The current application only displays these delivery statuses:

* Processing
* Shipped
* Out for Delivery
* Delivered

Users report that the current status is difficult to understand.

Redesign the experience so that a customer can understand the order's delivery progress, current status, expected delivery, and available actions **within a few seconds of opening the screen**.

The primary target is mobile.

Target viewport range:

* 360px
* 375px
* 390px
* 414px
* 430px

The UI should also gracefully adapt to larger screens.

---

# Required Technology

Use:

* React.js or Next.js
* TypeScript
* Tailwind CSS or clean CSS
* A reasonable icon library such as Lucide React
* Mock/static data only
* No backend is required

Prefer **Next.js + TypeScript + Tailwind CSS** if starting from scratch.

Use reusable components and clean project architecture.

Do NOT over-engineer the application.

---

# Core UX Goal

The customer should immediately understand:

1. What is the current status?
2. Where is my order in the delivery process?
3. When should I receive it?
4. Is anything wrong?
5. What can I do if there is a problem?

The design should prioritize these questions.

Avoid making the customer interpret complicated UI.

---

# Main Screen

Create a modern mobile Order Tracking screen containing:

### 1. Header
- Back button
- "Order Tracking" title
- Optional order number / overflow action

### 2. Current Status Hero
- Status icon, title, message, estimated delivery

### 3. Delivery Progress Timeline
- Order placed -> Processing -> Shipped -> Out for delivery -> Delivered
- Clear visual status (completed, current, upcoming) without relying on color alone

### 4. Estimated Delivery
- Prominent expected date / time window

### 5. Order/Product Summary
- Compact product info, image, quantity, price, order #, "View order details" action

---

# Support & Special States
- STATE 1: DELAYED ORDER (previous expected date, updated delivery, clear warning & support action)
- STATE 2: DELIVERED BUT NOT RECEIVED (acknowledged discrepancy, delivery info, proof-of-delivery, "Report a delivery issue" flow)
- STATE 3: TRACKING NOT AVAILABLE YET (order placed/processing, helpful explanation, not a broken empty timeline)
- Additional States: Loading skeleton, Error state with retry
- Interactive state switcher / demo toolbar
- Interactive Modals: Order Details bottom sheet/modal, Contact Support bottom sheet/modal, Report Delivery Issue flow (multi-step form with confirmation)

---

# Design & Mobile UX
- 360px - 430px mobile first, accessible contrast, semantic HTML, keyboard accessible, thumb-friendly
- Production ready, clean documentation, automated visual QA
```

---

## Prompt 2 - Pause for Implementation Plan Review
**Timestamp:** 2026-10-02T10:22:37+06:00

**Prompt Content:**
```markdown
dont start the full project yet i did not approve the implementation plan
```

---

## Prompt 3 - Approval and Implementation Request
**Timestamp:** 2026-10-02T10:52:36+06:00

**Prompt Content:**
```markdown
implement
```


