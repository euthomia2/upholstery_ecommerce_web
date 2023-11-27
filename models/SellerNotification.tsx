import { Admin } from "./Admin";
import { Seller } from "./Seller";

export interface SellerNotification {
  id: number;
  seller_notification_id: string;
  title: string;
  description: string;
  admin: Admin;
  seller: Seller;
  is_active: number;
  created_at: string;
  updated_at: string;
}
