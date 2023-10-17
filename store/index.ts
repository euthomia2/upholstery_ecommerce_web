import { authentication } from '@/services/authentication';
import { crudProduct } from '@/services/crud-product';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from '../slices/categoriesSlice';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  [authentication.reducerPath]: authentication.reducer,
  [crudProduct.reducerPath]: crudProduct.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authentication.middleware)
      .concat(crudProduct.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
