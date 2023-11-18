import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Shop } from '../models/Shop';

interface CreateShop {
  name: string;
  description: string;
}

interface UpdateShop {
  id?: number;
  name?: string;
  description?: string;
}

export const crudShop = createApi({
  reducerPath: 'crudShop',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Shops', 'ERROR'],
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => ({
        url: `shop/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Shops'],
    }),
    getShop: builder.query({
      query: (shopId) => ({
        url: `shop/${shopId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Shops'],
    }),
    getShopBySlug: builder.query({
      query: (shopSlug) => ({
        url: `shop/slug/${shopSlug}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Shops'],
    }),
    createShop: builder.mutation({
      query: (details) => ({
        url: `shop/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Shops'],
    }),
    updateShop: builder.mutation({
      query: (details) => ({
        url: `shop/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: (result, error, arg) => {
        if(error?.data.message) {
          return [{ type: 'ERROR'}]
        } else {
          return [{ type: 'Shops'}]
        }
      }
    }),
    deactivateShop: builder.mutation({
      query: (id) => ({
        url: `shop/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Shops'],
    }),
    activateShop: builder.mutation({
      query: (id) => ({
        url: `shop/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Shops'],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetShopQuery,
  useGetShopBySlugQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useActivateShopMutation,
  useDeactivateShopMutation,
} = crudShop;
