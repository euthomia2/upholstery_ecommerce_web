import { Customer } from "./Customer";
import { Product } from "./Product";
import { Shop } from "./Shop";

export interface Review {
  id: number;
  review_id: string;
  order_id: string;
  shop: Shop;
  product: Product;
  customer: Customer;
  comments: string;
  ratings: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}
