import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../models/Order';

interface CreateOrder {
  order_id: string;
  customer_id: string;
  seller_id: string;
  product_id: string;
  status: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface UpdateOrder {
  id?: number;
  order_id?: string;
  customer_id?: string;
  seller_id?: string;
  product_id?: string;
  status?: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

export const crudOrder = createApi({
  reducerPath: 'crudOrder',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: `order/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Orders'],
    }),
    getOrder: builder.query({
      query: (orderId) => ({
        url: `order/${orderId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      query: (details) => ({
        url: `order/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrder: builder.mutation({
      query: (details) => ({
        url: `order/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Orders'],
    }),
    deactivateOrder: builder.mutation({
      query: (id) => ({
        url: `order/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Orders'],
    }),
    activateOrder: builder.mutation({
      query: (id) => ({
        url: `order/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useActivateOrderMutation,
  useDeactivateOrderMutation,
} = crudOrder;
