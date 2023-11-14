import { Customer } from './Customer';
import { Product } from './Product';

export interface ReturnRefund {
  return_refund_id: string;
  customer_id: string;
  customer: Customer;
  reason: string;
  image_name: string;
  image_file: string;
  product: Product;
  status: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
