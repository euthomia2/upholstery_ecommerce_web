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
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `auth/customer/login`,
        method: 'POST',
        withCredentials: true,
        body: { email, password },
      }),
      invalidatesTags: ['Authentication'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `auth/customer/logout`,
        method: 'POST',
        withCredentials: true,
      }),
      invalidatesTags: ['Authentication'],
    }),
    getUser: builder.query({
      query: () => ({
        url: `auth/customer/user`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Authentication'],
    }),
    updateUser: builder.mutation({
      query: (details) => ({
        url: `auth/customer/user`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
    updatePass: builder.mutation({
      query: (details) => ({
        url: `auth/customer/password`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePassMutation,
} = authentication;
