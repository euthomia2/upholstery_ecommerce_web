import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import categoriesReducer from '../slices/categoriesSlice';
import cartReducer from '../slices/cartSlice';
import cartSaga from '../sagas/cartSaga';
import { authentication } from '@/services/authentication';
import { crudCategory } from '@/services/crud-category';
import { crudProduct } from '@/services/crud-product';
import { crudCustomer } from '@/services/crud-customer';
import { crudSeller } from '@/services/crud-seller';
import { crudShop } from '@/services/crud-shop';
import { crudOrder } from '@/services/crud-order';
import { crudVoucher } from '@/services/crud-voucher';
import { crudReturnRefund } from '@/services/crud-return-refund';
import { semaphoreApi } from '@/services/semaphore-api';
import { crudBankAccount } from '@/services/crud-bank-account';
import { crudSellerBalance } from '@/services/crud-seller-balance';
import { crudSellerWithdrawal } from '@/services/crud-seller-withdrawal';
import { crudReview } from '@/services/crud-review';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  [authentication.reducerPath]: authentication.reducer,
  [crudProduct.reducerPath]: crudProduct.reducer,
  [crudCategory.reducerPath]: crudCategory.reducer,
  [crudCustomer.reducerPath]: crudCustomer.reducer,
  [crudSeller.reducerPath]: crudSeller.reducer,
  [crudShop.reducerPath]: crudShop.reducer,
  [crudOrder.reducerPath]: crudOrder.reducer,
  [crudVoucher.reducerPath]: crudVoucher.reducer,
  [crudReturnRefund.reducerPath]: crudReturnRefund.reducer,
  [crudBankAccount.reducerPath]: crudBankAccount.reducer,
  [crudSellerBalance.reducerPath]: crudSellerBalance.reducer,
  [crudSellerWithdrawal.reducerPath]: crudSellerWithdrawal.reducer,
  [crudReview.reducerPath]: crudReview.reducer,
  [semaphoreApi.reducerPath]: semaphoreApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(authentication.middleware)
      .concat(crudProduct.middleware)
      .concat(crudCategory.middleware)
      .concat(crudCustomer.middleware)
      .concat(crudSeller.middleware)
      .concat(crudShop.middleware)
      .concat(crudOrder.middleware)
      .concat(crudVoucher.middleware)
      .concat(crudReturnRefund.middleware)
      .concat(crudBankAccount.middleware)
      .concat(crudSellerBalance.middleware)
      .concat(crudSellerWithdrawal.middleware)
      .concat(crudReview.middleware)
      .concat(semaphoreApi.middleware),
});

sagaMiddleware.run(cartSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
