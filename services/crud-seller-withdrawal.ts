import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SellerWithdrawal } from '../models/SellerWithdrawal';


export const crudSellerWithdrawal = createApi({
  reducerPath: 'crudSellerWithdrawal',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['SellerWithdrawal', 'ERROR'],
  endpoints: (builder) => ({
    getSellerWithdrawals: builder.query({
      query: () => ({
        url: `seller-withdrawal/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['SellerWithdrawal'],
    }),
    getSellerWithdrawal: builder.query({
      query: (sellerBalanceId) => ({
        url: `seller-withdrawal/${sellerBalanceId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['SellerWithdrawal'],
    }),
    createSellerWithdrawal: builder.mutation({
      query: (details) => ({
        url: `seller-withdrawal/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['SellerWithdrawal'],
    }),
    updateSellerWithdrawal: builder.mutation({
      query: (details) => ({
        url: `seller-withdrawal/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['SellerWithdrawal'],
    }),
    withdrawSellerWithdrawal: builder.mutation({
      query: (details) => ({
        url: `seller-withdrawal/withdraw/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['SellerWithdrawal'],
    }),
    deactivateSellerWithdrawal: builder.mutation({
      query: (id) => ({
        url: `seller-withdrawal/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['SellerWithdrawal'],
    }),
    activateSellerWithdrawal: builder.mutation({
      query: (id) => ({
        url: `seller-withdrawal/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['SellerWithdrawal'],
    }),
  }),
});

export const {
  useGetSellerWithdrawalsQuery,
  useGetSellerWithdrawalQuery,
  useCreateSellerWithdrawalMutation,
  useUpdateSellerWithdrawalMutation,
  useWithdrawSellerWithdrawalMutation,
  useActivateSellerWithdrawalMutation,
  useDeactivateSellerWithdrawalMutation,
} = crudSellerWithdrawal;
