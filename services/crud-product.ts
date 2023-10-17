import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/Product';

interface CreateProduct {
  name: string;
  description: string;
  price: number;
  category_id: string;
  shop_id: string;
  image_name: string;
  image_file: string;
}

interface UpdateProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  category_id?: string;
  shop_id?: string;
  image_name?: string;
  image_file?: string;
}

export const crudProduct = createApi({
  reducerPath: 'crudProduct',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getLatestProducts: builder.query({
      query: () => ({
        url: `product/latest-products`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `product/${productId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetLatestProductsQuery, useGetProductQuery } = crudProduct;
