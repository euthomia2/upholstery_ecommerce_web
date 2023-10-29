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
  isLoading: boolean;
  isLoggedIn: boolean;
  isAddedProduct: boolean;
  open: boolean;
  products: Product[];
  totalQuantity: number;
  totalPrice: number;
};

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isAddedProduct: false,
  open: false,
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
  shippingFee: 39,
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
    checkAuth(state: InitialState, action) {
      state.isLoggedIn = action.payload;
    },
    fetchingProducts(state: InitialState, action) {
      state.isLoading = true;
    },
    fetchProducts(state: InitialState, action) {
      state.products = action.payload;

      if (state.products.length !== 0) {
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
      }

      state.isLoading = false;
    },
    fetchProductsError(state: InitialState, action) {
      state.isLoading = false;
    },
    closeModal(state: InitialState, action) {
      state.isAddedProduct = false;
    },
    addProduct(state: InitialState, action) {
      state.isAddedProduct = true;
      if (state.isLoggedIn) {
        const sameProduct = state.products.find(
          (el) => el.id === action.payload.id
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

        const inOneDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        localStorage.setItem(
          'cart',
          JSON.stringify({
            data: state.products,
            expiration: inOneDay.toISOString(),
          })
        );

        toast.success('Product added to cart!');
      }
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

      const inOneDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

      localStorage.setItem(
        'cart',
        JSON.stringify({
          data: state.products,
          expiration: inOneDay.toISOString(),
        })
      );
    },
    clearCart(state: InitialState) {
      localStorage.removeItem('cart');
    },
  },
});

export const {
  fetchingProducts,
  fetchProducts,
  fetchProductsError,
  closeModal,
  checkAuth,
  openCart,
  closeCart,
  clearCart,
  addProduct,
  removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
