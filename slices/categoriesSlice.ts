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
        ],
      },
    ],
    pages: [
      { name: 'Products', href: '/products' },
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
