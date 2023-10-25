import { createSlice } from '@reduxjs/toolkit';

export type SectionItem = {
  name: string;
  href: string;
};

export type Section = {
  id: string;
  name: string;
  items: SectionItem[];
};

export type Category = {
  id: string;
  name: string;
  sections: Section[];
};

export type Navigation = {
  categories: Category[];
  pages: SectionItem[];
};

export type InitialState = {
  open: boolean;
  navigation: Navigation;
};

const initialState = {
  open: false,
  navigation: {
    categories: [
      {
        id: 'category',
        name: 'Categories',
        sections: [
          {
            id: 'category',
            name: 'Categories',
            items: [
              { name: 'Fabrics', href: '#' },
              { name: 'Tools', href: '#' },
              { name: 'Kits', href: '#' },
              { name: 'DIY Upholstery', href: '#' },
              { name: 'Materials', href: '#' },
              { name: 'Upholstered Furniture', href: '#' },
              { name: 'Decorative Accessories', href: '#' },
              { name: 'Fabric Dye and Paint', href: '#' },
              { name: 'Custom Crafts and Upholstery Services', href: '#' },
              { name: 'Crafts', href: '#' },
              { name: 'Supplies', href: '#' },
            ],
          },
          {
            id: 'accessories',
            name: 'Crafts',
            items: [
              { name: 'Art Supplies', href: '#' },
              { name: 'Drawing and Sketching', href: '#' },
              { name: 'Paper Crafting', href: '#' },
              { name: 'Sewing and Textile Crafts', href: '#' },
              { name: 'Jewelry Making', href: '#' },
              { name: 'Knitting and Crochet', href: '#' },
              { name: 'Woodworking and Carving', href: '#' },
              { name: 'Candle and Soap Making', href: '#' },
              { name: 'Modeling and Sculpting', href: '#' },
              { name: 'Leathercraft', href: '#' },
              { name: 'Floral Crafts', href: '#' },
              { name: 'DIY Home Decor', href: '#' },
            ],
          },
          {
            id: 'upholstery',
            name: 'Upholstery',
            items: [
              { name: 'Upholstery Fabrics', href: '#' },
              { name: 'Foam and Padding', href: '#' },
              { name: 'Upholstery Tools', href: '#' },
              { name: 'Furniture Pieces', href: '#' },
              { name: 'Buttons and Tufting Supplies', href: '#' },
              { name: 'Trim and Tassel Fringe', href: '#' },
              { name: 'Adhesives and Glues', href: '#' },
              { name: 'Nails, Screws, and Fasteners', href: '#' },
              { name: 'Springs and Suspension Systems', href: '#' },
              { name: 'Furniture Frames and Structure', href: '#' },
              { name: 'Cushion Inserts and Filling', href: '#' },
              { name: 'Upholstery Repair Kits', href: '#' },
              { name: 'Cleaning and Care Products', href: '#' },
              { name: 'Fabric Protector Sprays', href: '#' },
              { name: 'Custom Upholstery Services', href: '#' },
            ],
          },
        ],
      },
    ],
    pages: [
      { name: 'Products', href: '#' },
      { name: 'Seller Centre', href: '/seller/login' },
      { name: 'Start Selling', href: '/seller/signup' },
    ],
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    openCategories(state: InitialState) {
      state.open = true;
    },
    closeCategories(state: InitialState) {
      state.open = false;
    },
  },
});

export const { openCategories, closeCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
export type CategoriesStateType = ReturnType<typeof categoriesSlice.reducer>;
