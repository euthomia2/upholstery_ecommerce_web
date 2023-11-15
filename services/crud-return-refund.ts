import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReturnRefund } from '../models/ReturnRefund';

export const crudReturnRefund = createApi({
  reducerPath: 'crudReturnRefund',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['ReturnRefunds'],
  endpoints: (builder) => ({
    getReturnRefunds: builder.query({
      query: () => ({
        url: `return-refund/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['ReturnRefunds'],
    }),
    getReturnRefund: builder.query({
      query: (returnRefundId) => ({
        url: `return-refund/${returnRefundId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['ReturnRefunds'],
    }),
    getReturnRefundBySlug: builder.query({
      query: (returnRefundSlug) => ({
        url: `return-refund/slug/${returnRefundSlug}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['ReturnRefunds'],
    }),
    createReturnRefund: builder.mutation({
        query: (details) => {
          const formData = new FormData();
          formData.append(
            'image_file',
            details.image_file,
            details.image_file.name
          );
          formData.append('details', JSON.stringify(details));
  
          return {
            url: `return-refund/add`,
            method: 'POST',
            withCredentials: true,
            body: formData,
            formData: true,
          };
        },
        invalidatesTags: ['ReturnRefunds'],
      }),
      updateReturnRefund: builder.mutation({
        query: (details) => ({
          url: `return-refund/update-status/${details?.id}`,
          method: 'PATCH',
          withCredentials: true,
          body: { details },
        }),
        invalidatesTags: ['ReturnRefunds'],
      }),
  }),
});

export const {
  useGetReturnRefundsQuery,
  useGetReturnRefundQuery,
  useGetReturnRefundBySlugQuery,
  useCreateReturnRefundMutation,
  useUpdateReturnRefundMutation,
} = crudReturnRefund;
