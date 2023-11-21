import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Review } from '../models/Review';
import { Shop } from '../models/Shop';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';

interface CreateReview {
  review_id: string;
  order_id: string;
  shop: Shop;
  product: Product;
  customer: Customer;
  comments: string;
  ratings: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface UpdateReview {
  id?: number;
  review_id?: string;
  order_id?: string;
  shop?: Shop;
  product?: Product;
  customer?: Customer;
  comments?: string;
  ratings?: number;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

export const crudReview = createApi({
  reducerPath: 'crudReview',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviews: builder.query<Review, void>({
      query: () => ({
        url: `review/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Reviews'],
    }),
    getReview: builder.query<Review, void>({
      query: (reviewId) => ({
        url: `review/${reviewId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Reviews'],
    }),
    createReview: builder.mutation<CreateReview, CreateReview>({
      query: (details) => ({
        url: `review/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Reviews'],
    }),
    updateReview: builder.mutation<UpdateReview, UpdateReview>({
      query: (details) => ({
        url: `review/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Reviews'],
    }),
    deactivateReview: builder.mutation<number, UpdateReview>({
      query: (id) => ({
        url: `review/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Reviews'],
    }),
    activateReview: builder.mutation<number, UpdateReview>({
      query: (id) => ({
        url: `review/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useActivateReviewMutation,
  useDeactivateReviewMutation,
} = crudReview;
