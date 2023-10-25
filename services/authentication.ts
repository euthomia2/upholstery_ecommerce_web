import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Login } from '@/models/Login';
import { Logout } from '@/models/Logout';
import { User } from '@/models/User';

interface LoginArgs {
  email: string;
  password: string;
}

interface GetUser {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  user: User;
}

interface UpdateUser {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  gender?: string;
  contact_number?: string;
}

interface UpdatePass {
  current_password?: string;
  new_password?: string;
  confirm_new_password?: string;
}

export const authentication = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Authentication'],
  endpoints: (builder) => ({
    customerLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: `auth/customer/login`,
        method: 'POST',
        withCredentials: true,
        body: { email, password },
      }),
      invalidatesTags: ['Authentication'],
    }),
    customerLogout: builder.mutation({
      query: () => ({
        url: `auth/customer/logout`,
        method: 'POST',
        withCredentials: true,
      }),
      invalidatesTags: ['Authentication'],
    }),
    customerGetUser: builder.query({
      query: () => ({
        url: `auth/customer/user`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Authentication'],
    }),
    customerUpdateUser: builder.mutation({
      query: (details) => ({
        url: `auth/customer/user`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
    customerUpdatePass: builder.mutation({
      query: (details) => ({
        url: `auth/customer/password`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
    sellerLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: `auth/seller/login`,
        method: 'POST',
        withCredentials: true,
        body: { email, password },
      }),
      invalidatesTags: ['Authentication'],
    }),
    sellerLogout: builder.mutation({
      query: () => ({
        url: `auth/seller/logout`,
        method: 'POST',
        withCredentials: true,
      }),
      invalidatesTags: ['Authentication'],
    }),
    sellerGetUser: builder.query({
      query: () => ({
        url: `auth/seller/user`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Authentication'],
    }),
    sellerUpdateUser: builder.mutation({
      query: (details) => ({
        url: `auth/seller/user`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
    sellerUpdatePass: builder.mutation({
      query: (details) => ({
        url: `auth/seller/password`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
  }),
});

export const {
  useCustomerLoginMutation,
  useCustomerLogoutMutation,
  useCustomerGetUserQuery,
  useCustomerUpdateUserMutation,
  useCustomerUpdatePassMutation,
  useSellerLoginMutation,
  useSellerLogoutMutation,
  useSellerGetUserQuery,
  useSellerUpdateUserMutation,
  useSellerUpdatePassMutation,
} = authentication;
