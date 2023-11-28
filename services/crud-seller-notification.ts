import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SellerNotification } from '../models/SellerNotification';

export const crudSellerNotification = createApi({
  reducerPath: 'crudSellerNotification',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['SellerNotification', 'ERROR'],
  endpoints: (builder) => ({
    getSellerNotifications: builder.query({
      query: () => ({
        url: `seller-notification/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['SellerNotification'],
    }),
    getSellerNotification: builder.query({
      query: (sellerNotificationId) => ({
        url: `seller-notification/${sellerNotificationId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['SellerNotification'],
    }),
    getSellerNotificationBySellerId: builder.query({
      query: (sellerId) => ({
        url: `seller-notification/seller/${sellerId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['SellerNotification'],
    }),
    createSellerNotification: builder.mutation({
      query: (details) => ({
        url: `seller-notification/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['SellerNotification'],
    }),
    withdrawSellerNotification: builder.mutation({
      query: (details) => ({
        url: `seller-notification/withdraw/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['SellerNotification'],
    }),
    deactivateSellerNotification: builder.mutation({
      query: (id) => ({
        url: `seller-notification/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['SellerNotification'],
    }),
    activateSellerNotification: builder.mutation({
      query: (id) => ({
        url: `seller-notification/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['SellerNotification'],
    }),
  }),
});

export const {
  useGetSellerNotificationsQuery,
  useGetSellerNotificationQuery,
  useGetSellerNotificationBySellerIdQuery,
  useCreateSellerNotificationMutation,
  useWithdrawSellerNotificationMutation,
  useActivateSellerNotificationMutation,
  useDeactivateSellerNotificationMutation,
} = crudSellerNotification;
