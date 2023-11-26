import { Customer } from "./Customer";
import { Shop } from "./Shop";

export interface Follow {
  id: number;
  follow_id: string;
  shop: Shop;
  customer: Customer;
  is_active: number;
  created_at: string;
  updated_at: string;
}
