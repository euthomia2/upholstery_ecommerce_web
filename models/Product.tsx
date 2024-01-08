import { Category } from "./Category";
import { Seller } from "./Seller";

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
  image_name_2: string;
  image_file_2: string;
  image_name_3: string;
  image_file_3: string;
  image_name_4: string;
  image_file_4: string;
  image_name_5: string;
  image_file_5: string;
  image_name_6: string;
  image_file_6: string;
  image_name_7: string;
  image_file_7: string;
  image_name_8: string;
  image_file_8: string;
  image_name_9: string;
  image_file_9: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
