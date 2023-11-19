import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SellerBalance } from '../models/SellerBalance';


export const crudSellerBalance = createApi({
  reducerPath: 'crudSellerBalance',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['SellerBalance', 'ERROR'],
  endpoints: (builder) => ({
    getSellerBalances: builder.query({
      query: () => ({
        url: `seller-balance/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['SellerBalance'],
    }),
    getSellerBalance: builder.query({
      query: (sellerBalanceId) => ({
        url: `seller-balance/${sellerBalanceId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['SellerBalance'],
    }),
    createSellerBalance: builder.mutation({
      query: (details) => ({
        url: `seller-balance/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['SellerBalance'],
    }),
    updateSellerBalance: builder.mutation({
      query: (details) => ({
        url: `seller-balance/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: (result, error, arg) => {
        if(error?.data.message) {
          return [{ type: 'ERROR'}]
        } else {
          return [{ type: 'SellerBalance'}]
        }
      }
    }),
    withdrawSellerBalance: builder.mutation({
      query: (details) => ({
        url: `seller-balance/withdraw/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['SellerBalance'],
    }),
    deactivateSellerBalance: builder.mutation({
      query: (id) => ({
        url: `seller-balance/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['SellerBalance'],
    }),
    activateSellerBalance: builder.mutation({
      query: (id) => ({
        url: `seller-balance/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['SellerBalance'],
    }),
  }),
});

export const {
  useGetSellerBalancesQuery,
  useGetSellerBalanceQuery,
  useCreateSellerBalanceMutation,
  useUpdateSellerBalanceMutation,
  useWithdrawSellerBalanceMutation,
  useActivateSellerBalanceMutation,
  useDeactivateSellerBalanceMutation,
} = crudSellerBalance;
