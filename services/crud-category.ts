import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../models/Category';

interface CreateCategory {
  title: string;
  description: string;
}

interface UpdateCategory {
  id?: number;
  title?: string;
  description?: string;
}

export const crudCategory = createApi({
  reducerPath: 'crudCategory',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `category/all-sorted`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Categories'],
    }),
    getCategory: builder.query({
      query: (categoryId) => ({
        url: `category/${categoryId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = crudCategory;
