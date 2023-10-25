import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/User';

interface GetSeller {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  user: User;
}

interface CreateSeller {
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

interface UpdateSeller {
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

export const crudSeller = createApi({
  reducerPath: 'crudSeller',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Sellers'],
  endpoints: (builder) => ({
    getSeller: builder.query({
      query: (sellerId) => ({
        url: `seller/${sellerId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Sellers'],
    }),
    createSeller: builder.mutation({
      query: (details) => ({
        url: `seller/new`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Sellers'],
    }),
    updateSeller: builder.mutation({
      query: (details) => ({
        url: `seller/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Sellers'],
    }),
  }),
});

export const {
  useGetSellerQuery,
  useCreateSellerMutation,
  useUpdateSellerMutation,
} = crudSeller;
