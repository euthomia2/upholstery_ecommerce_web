import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const crudVoucher = createApi({
  reducerPath: 'crudVoucher',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
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
