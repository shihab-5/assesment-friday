export type OrderStatusType =
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed'
  | 'delivered_not_received'
  | 'tracking_unavailable';

export type DemoStateKey =
  | 'out_for_delivery'
  | 'delayed'
  | 'delivered_not_received'
  | 'tracking_unavailable'
  | 'shipped'
  | 'delivered'
  | 'loading'
  | 'error';

export type TimelineStepStatus = 'completed' | 'current' | 'upcoming' | 'delayed' | 'alert';

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  location?: string;
  status: TimelineStepStatus;
  badge?: string;
}

export interface OrderProduct {
  id: string;
  name: string;
  variant?: string;
  sku: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface ShippingAddress {
  recipientName: string;
  street: string;
  aptOrSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryInstructions?: string;
}

export interface CarrierDetails {
  name: string;
  trackingNumber: string;
  trackingUrl?: string;
  serviceLevel: string;
  contactPhone?: string;
  driverName?: string;
}

export interface ProofOfDelivery {
  photoUrl: string;
  deliveredAt: string;
  dropoffLocation: string;
  signedBy?: string;
}

export interface OrderData {
  orderId: string;
  orderDate: string;
  status: OrderStatusType;
  statusTitle: string;
  statusSubtitle: string;
  statusBadgeText?: string;
  estimatedDeliveryFormatted: string;
  estimatedDeliveryWindow?: string;
  previousEstimatedDelivery?: string;
  delayReason?: string;
  carrier: CarrierDetails;
  shippingAddress: ShippingAddress;
  products: OrderProduct[];
  pricing: {
    subtotal: number;
    shipping: number;
    tax: number;
    discount?: number;
    total: number;
    paymentMethod: string;
  };
  timeline: TimelineStep[];
  proofOfDelivery?: ProofOfDelivery;
  discrepancyNotice?: {
    headline: string;
    message: string;
    suggestedSteps: string[];
  };
  trackingUnavailableNotice?: {
    headline: string;
    message: string;
    actionAdvice: string;
  };
}
