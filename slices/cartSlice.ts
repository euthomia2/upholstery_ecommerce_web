import { toast } from 'react-hot-toast';
import { createSlice } from '@reduxjs/toolkit';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: string;
  shop_id: string;
  quantity: number;
  image_name: string;
  image_file: string;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type InitialState = {
  open: boolean;
  products: Product[];
  totalQuantity: number;
  totalPrice: number;
};

const initialState = {
  open: false,
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart(state: InitialState) {
      state.open = true;
    },
    closeCart(state: InitialState) {
      state.open = false;
    },
    addProduct(state: InitialState, action) {
      const sameProduct = state.products.find(
        (el) => el.name === action.payload.name
      );

      if (sameProduct) {
        const filteredProduct = state.products.map((el) => {
          if (el.id === sameProduct.id) {
            el.quantity += 1;
            el.price += action.payload.price;
          }

          return el;
        });

        state.products = [...filteredProduct];
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.products.push(newProduct);
      }

      const newTotalQuantity = state.products.reduce(
        (accu, el) => accu + el.quantity,
        0
      );

      const newTotalPrice = state.products.reduce(
        (accu, el) => accu + el.price,
        0
      );

      state.totalQuantity = newTotalQuantity;
      state.totalPrice = newTotalPrice;

      toast.success('Product added to cart!');
    },
    removeProduct(state: InitialState, action) {
      const filteredProducts = state.products.filter(
        (el) => el.id !== action.payload.id
      );

      state.products = [...filteredProducts];

      const newTotalQuantity = state.products.reduce(
        (accu, el) => accu + el.quantity,
        0
      );

      const newTotalPrice = state.products.reduce(
        (accu, el) => accu + el.price,
        0
      );

      state.totalQuantity = newTotalQuantity;
      state.totalPrice = newTotalPrice;
    },
  },
});

export const { openCart, closeCart, addProduct, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
