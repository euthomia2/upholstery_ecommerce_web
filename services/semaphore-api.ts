import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const semaphoreApi = createApi({
  reducerPath: 'semaphoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.semaphore.co/api/v4/',
    credentials: 'include',
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    sendMessages: builder.mutation({
        query: () => ({
          url: `messages`,
          method: 'POST',
          withCredentials: true,
        }),
        invalidatesTags: ['Messages'],
      }),
  }),
});

export const { useGetVouchersQuery, useGetVoucherMutation } = semaphoreApi;
