import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const semaphoreApi = createApi({
  reducerPath: 'semaphoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    sendMessages: builder.mutation({
        query: (details) => ({
          url: `semaphore/send-messages`,
          method: 'POST',
          withCredentials: true,
          body: { details },
        }),
        invalidatesTags: ['Messages'],
      }),
      sendOtp: builder.mutation({
        query: (details) => ({
          url: `semaphore/send-otp`,
          method: 'POST',
          withCredentials: true,
          body: { details },
        }),
        invalidatesTags: ['Messages'],
      }),
  }),
});

export const { useSendMessagesMutation, useSendOtpMutation } = semaphoreApi;
