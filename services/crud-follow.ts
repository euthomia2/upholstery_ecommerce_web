import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Follow } from '../models/Follow';

export const crudFollow = createApi({
  reducerPath: 'crudFollow',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Follow', 'ERROR'],
  endpoints: (builder) => ({
    getFollows: builder.query({
      query: () => ({
        url: `follow/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Follow'],
    }),
    getFollow: builder.query({
      query: (followId) => ({
        url: `follow/${followId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Follow'],
    }),
    createFollow: builder.mutation({
      query: (details) => ({
        url: `follow/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Follow'],
    }),
    deleteFollow: builder.mutation({
      query: (details) => ({
        url: `follow/unfollow/${details?.id}`,
        method: 'DELETE',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Follow'],
    }),
    withdrawFollow: builder.mutation({
      query: (details) => ({
        url: `follow/withdraw/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Follow'],
    }),
    deactivateFollow: builder.mutation({
      query: (id) => ({
        url: `follow/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Follow'],
    }),
    activateFollow: builder.mutation({
      query: (id) => ({
        url: `follow/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Follow'],
    }),
  }),
});

export const {
  useGetFollowsQuery,
  useGetFollowQuery,
  useCreateFollowMutation,
  useDeleteFollowMutation,
  useWithdrawFollowMutation,
  useActivateFollowMutation,
  useDeactivateFollowMutation,
} = crudFollow;
