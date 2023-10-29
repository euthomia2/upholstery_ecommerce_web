import { Category } from './Category';
import { Seller } from './Seller';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  seller: Seller;
  image_name: string;
  image_file: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
