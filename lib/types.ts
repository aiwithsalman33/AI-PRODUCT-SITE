export type ProductStatus = 'received' | 'pending_approval' | 'generated' | 'published' | 'rejected' | 'failed';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  features: string;
  status: ProductStatus;
  description?: string;
  seoKeywords?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedContent {
  title: string;
  description: string;
  bullets: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface DashboardStats {
  total_products: number;
  pending: number;
  published: number;
  rejected: number;
}

export interface AddProductPayload {
  name: string;
  features: string;
  price: number;
  category: string;
}

export interface PipelineStep {
  id: number;
  label: string;
  subtitle: string;
  status: 'idle' | 'running' | 'done' | 'failed';
}

export type Category =
  | 'Electronics'
  | 'Fashion'
  | 'Home & Kitchen'
  | 'Beauty & Personal Care'
  | 'Fitness & Sports'
  | 'Books & Education'
  | 'Toys & Games'
  | 'Automotive'
  | 'Jewellery & Accessories'
  | 'Food & Beverages'
  | 'Health & Wellness'
  | 'Baby & Kids'
  | 'Office Supplies'
  | 'Pet Supplies'
  | 'Other';

export const CATEGORIES: Category[] = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Fitness & Sports',
  'Books & Education',
  'Toys & Games',
  'Automotive',
  'Jewellery & Accessories',
  'Food & Beverages',
  'Health & Wellness',
  'Baby & Kids',
  'Office Supplies',
  'Pet Supplies',
  'Other',
];

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: 1, label: 'Trigger Received',     subtitle: 'Webhook inbound from form',      status: 'idle' },
  { id: 2, label: 'Input Validated',      subtitle: 'Sanitising & mapping category',  status: 'idle' },
  { id: 3, label: 'Variants Generated',   subtitle: 'Parallel LLM calls running',     status: 'idle' },
  { id: 4, label: 'Best Variant Selected',subtitle: 'Scoring by length & sentiment',  status: 'idle' },
  { id: 5, label: 'Notification Sent',    subtitle: 'Email / Slack alert dispatched', status: 'idle' },
  { id: 6, label: 'Persisted to Sheets',  subtitle: 'Row written & status updated',   status: 'idle' },
];
