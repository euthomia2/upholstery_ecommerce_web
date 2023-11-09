'use client';

import { useState, useEffect, useMemo } from 'react';
import Cart from '@/components/cart/Cart';
import Header from '@/components/header/Header';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useDispatch } from 'react-redux';
import { useCustomerGetUserQuery } from '@/services/authentication';
import { fetchingProducts } from '@/slices/cartSlice';
import DiscountVouchers from '@/components/discount-vouchers/DiscountVouchers';
import { useGetVouchersQuery } from '@/services/crud-voucher';

export default function DiscountVouchersPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: vouchers, isFetching: voucherFetching } = useGetVouchersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Cookies.get('is_authenticated')) {
      router.push('/');
    }

    dispatch(fetchingProducts());

    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [dispatch]);

  if (isLoading || isFetching || voucherFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <div className='bg-white h-screen'>
      <Cart />

      <Header>
        <DiscountVouchers vouchers={vouchers} />
      </Header>
    </div>
  );
}
