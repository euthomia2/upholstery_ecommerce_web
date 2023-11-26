import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Notification } from '../models/Notification';

export const crudNotification = createApi({
  reducerPath: 'crudNotification',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Notification', 'ERROR'],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `notification/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Notification'],
    }),
    getNotification: builder.query({
      query: (notificationId) => ({
        url: `notification/${notificationId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Notification'],
    }),
    getNotificationByCustomerId: builder.query({
      query: (customerId) => ({
        url: `notification/customer/${customerId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Notification'],
    }),
    createNotification: builder.mutation({
      query: (details) => ({
        url: `notification/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Notification'],
    }),
    withdrawNotification: builder.mutation({
      query: (details) => ({
        url: `notification/withdraw/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Notification'],
    }),
    deactivateNotification: builder.mutation({
      query: (id) => ({
        url: `notification/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Notification'],
    }),
    activateNotification: builder.mutation({
      query: (id) => ({
        url: `notification/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useGetNotificationByCustomerIdQuery,
  useCreateNotificationMutation,
  useWithdrawNotificationMutation,
  useActivateNotificationMutation,
  useDeactivateNotificationMutation,
} = crudNotification;
