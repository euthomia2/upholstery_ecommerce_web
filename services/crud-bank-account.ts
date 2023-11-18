import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BankAccount } from '../models/BankAccount';

interface CreateBankAccount {
  name: string;
  contact_number: string;
}

interface UpdateBankAccount {
  id?: number;
  name?: string;
  contact_number?: string;
}

export const crudBankAccount = createApi({
  reducerPath: 'crudBankAccount',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['BankAccounts', 'ERROR'],
  endpoints: (builder) => ({
    getBankAccounts: builder.query({
      query: () => ({
        url: `bank-accounts/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['BankAccounts'],
    }),
    getBankAccount: builder.query({
      query: (bankAccountsId) => ({
        url: `bank-accounts/${bankAccountsId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['BankAccounts'],
    }),
    createBankAccount: builder.mutation({
      query: (details) => ({
        url: `bank-accounts/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['BankAccounts'],
    }),
    updateBankAccount: builder.mutation({
      query: (details) => ({
        url: `bank-accounts/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: (result, error, arg) => {
        if(error?.data.message) {
          return [{ type: 'ERROR'}]
        } else {
          return [{ type: 'BankAccounts'}]
        }
      }
    }),
    deactivateBankAccount: builder.mutation({
      query: (id) => ({
        url: `bank-accounts/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['BankAccounts'],
    }),
    activateBankAccount: builder.mutation({
      query: (id) => ({
        url: `bank-accounts/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['BankAccounts'],
    }),
  }),
});

export const {
  useGetBankAccountsQuery,
  useGetBankAccountQuery,
  useCreateBankAccountMutation,
  useUpdateBankAccountMutation,
  useActivateBankAccountMutation,
  useDeactivateBankAccountMutation,
} = crudBankAccount;
