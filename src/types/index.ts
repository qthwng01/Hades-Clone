export interface IProduct {
  id: string
  name: string
  slug: string
  price: number
  stock: number
  description?: string | null
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export type IProductList = IProduct[]

export type OrderItemInput = {
  productId: string
  quantity: number
  price: number
}

export type CheckoutInfoInput = {
  address: string
  phone: string
  paymentMethod: string
}

// Type dành cho Stripe Session

// export interface OrderInfoMetadata {
//   address: string
//   phone: string
//   paymentMethod: string
// }

// export interface OrderItemsMetadata {
//   productId: string
//   quantity: number
//   price: number
// }

export interface ISessionStripe {
  id: string
  amount_subtotal: number
  amount_total: number
  customer_details: {
    email: string | null
  }
  metadata: {
    productIds: any
    orderInfo: any
  }
  payment_status: 'paid' | 'unpaid' | 'no_payment_required'
  shipping_cost: {
    amount_subtotal: number
    amount_tax: number
    amount_total: number
    shipping_rate: string
  } | null
  shipping_options: {
    shipping_amount: number
    shipping_rate: string
  }[]
  status: 'open' | 'complete' | 'expired'
  total_details: {
    amount_discount: number
    amount_shipping: number
    amount_tax: number
    breakdown?: {
      discounts: any[]
      shipping: any[]
      tax_breakdown: any[]
    }
  }
}

export type LineItem = {
  id: string;
  object: 'item';
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  price: {
    id: string;
    object: 'price';
    active: boolean;
    billing_scheme: 'per_unit' | 'tiered' | null;
    created: number;
    currency: string;
    custom_unit_amount: null | {
      minimum: number;
      maximum: number;
      preset: number;
    };
    livemode: boolean;
    lookup_key: string | null;
    metadata: Record<string, string>;
    nickname: string | null;
    product: string;
    recurring: null | {
      interval: 'day' | 'week' | 'month' | 'year';
      interval_count: number;
      aggregate_usage: null | string;
      trial_period_days: number | null;
      usage_type: 'licensed' | 'metered';
    };
    tax_behavior: 'exclusive' | 'inclusive' | 'unspecified' | null;
    tiers_mode: 'graduated' | 'volume' | null;
    transform_quantity: null | {
      divide_by: number;
      round: 'up' | 'down';
    };
    type: 'one_time' | 'recurring';
    unit_amount: number;
    unit_amount_decimal: string;
  };
  quantity: number;
};

export type LineItems = LineItem[];
