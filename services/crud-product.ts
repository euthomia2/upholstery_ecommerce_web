import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/Product';

interface CreateProduct {
  name: string;
  description: string;
  price: number;
  category_id: string;
  shop_id: string;
  image_name: string;
  image_file: string;
}

interface UpdateProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  category_id?: string;
  shop_id?: string;
  image_name?: string;
  image_file?: string;
}

export const crudProduct = createApi({
  reducerPath: 'crudProduct',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `product/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
    getLatestProducts: builder.query({
      query: () => ({
        url: `product/latest-products`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `product/${productId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `product/slug/${slug}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation({
      query: (details) => {
        const formData = new FormData();
        formData.append(
          'image_file',
          details.image_file,
          details.image_file.name
        );

        if(details.video_file) {
          formData.append(
            'video_file',
            details.video_file,
            details.video_file.name
          );
        }

        formData.append('details', JSON.stringify(details));

        return {
          url: `product/add`,
          method: 'POST',
          withCredentials: true,
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: (details) => {
        const formData = new FormData();

        if (details?.image_file) {
          formData.append(
            'image_file',
            details.image_file,
            details.image_file.name
          );
        }
        
        if(details?.video_file) {
          formData.append(
            'video_file',
            details.video_file,
            details.video_file.name
          );
        }
        formData.append('details', JSON.stringify(details));

        return {
          url: `product/update/${details?.id}`,
          method: 'PATCH',
          withCredentials: true,
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Products'],
    }),
    deactivateProduct: builder.mutation({
      query: (id) => ({
        url: `product/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Products'],
    }),
    activateProduct: builder.mutation({
      query: (id) => ({
        url: `product/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetLatestProductsQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useActivateProductMutation,
  useDeactivateProductMutation,
} = crudProduct;
