import { Product } from "@/slices/cartSlice";
import { Seller } from "./Seller";

export interface SellerBalance {
  id: number;
  seller_balance_id: string;
  seller: Seller;
  product: Product;
  amount: number;
  status: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
