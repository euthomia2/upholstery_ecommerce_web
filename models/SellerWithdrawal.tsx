import { Shop } from "./Shop";

export interface SellerWithdrawal {
  id: number;
  seller_withdrawal_id: string;
  shop: Shop;
  amount: number;
  status: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
