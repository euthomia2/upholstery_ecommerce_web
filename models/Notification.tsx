import { Customer } from "./Customer";
import { Shop } from "./Shop";

export interface Notification {
  id: number;
  notification_id: string;
  title: string;
  description: string;
  shop: Shop;
  customer: Customer;
  is_active: number;
  created_at: string;
  updated_at: string;
}
