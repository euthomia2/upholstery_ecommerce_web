import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const crudVoucher = createApi({
  reducerPath: 'crudVoucher',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Vouchers'],
  endpoints: (builder) => ({
    getVouchers: builder.query({
      query: () => ({
        url: `voucher/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Vouchers'],
    }),
    getVoucher: builder.mutation({
      query: (voucherName) => ({
        url: `voucher/${voucherName}`,
        method: 'POST',
        withCredentials: true,
      }),
      invalidatesTags: ['Vouchers'],
    }),
  }),
});

export const { useGetVouchersQuery, useGetVoucherMutation } = crudVoucher;
