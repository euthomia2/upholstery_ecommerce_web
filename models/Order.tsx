export interface Order {
  order_id: string;
  customer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  status: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
