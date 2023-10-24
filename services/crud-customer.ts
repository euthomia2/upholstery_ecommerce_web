import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/User';

interface GetCustomer {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  user: User;
}

interface CreateCustomer {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  birth_date: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  zip_code: string;
  street_address: string;
}

interface UpdateCustomer {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  gender?: string;
  contact_number?: string;
  birth_date?: string;
  region?: string;
  province?: string;
  city?: string;
  barangay?: string;
  zip_code?: string;
  street_address?: string;
}

export const crudCustomer = createApi({
  reducerPath: 'crudCustomer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Customers'],
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (customerId) => ({
        url: `customer/${customerId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Customers'],
    }),
    createCustomer: builder.mutation({
      query: (details) => ({
        url: `customer/new`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Customers'],
    }),
    updateCustomer: builder.mutation({
      query: (details) => ({
        url: `customer/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = crudCustomer;
