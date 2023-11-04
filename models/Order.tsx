import { Product } from './Product';

export interface Order {
  order_id: string;
  customer_id: string;
  products: Product[];
  status: string;
  is_active: number;
  total_quantity: number;
  subtotal_price: number;
  created_at: string;
  updated_at: string;
}
