'use client';

import { useState, useEffect, useMemo } from 'react';
import Cart from '@/components/cart/Cart';
import Header from '@/components/header/Header';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useCustomerGetUserQuery } from '@/services/authentication';
import { fetchingProducts } from '@/slices/cartSlice';
import { useGetOrdersQuery } from '@/services/crud-order';
import MyReturnRefunds from '@/components/my-return-refunds/MyReturnRefunds';
import { useGetReturnRefundsQuery } from '@/services/crud-return-refund';

export default function MyReturnRefundsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: returnRefunds, isFetching: returnRefundsFetching } = useGetReturnRefundsQuery();
  const dispatch = useDispatch();

  const customerReturnRefund = useMemo(() => {
    if (returnRefunds && user) {
      return returnRefunds
        ?.filter((el) => el.customer.id === user.id)
        .sort((a, b) => b.id - a.id);
    }

    return [];
  }, [user, returnRefunds]);

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

  if (isLoading || isFetching || returnRefundsFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <div className='bg-white h-screen'>
      <Cart />

      <Header>
        <MyReturnRefunds customer={user} returnRefunds={customerReturnRefund} />
      </Header>
    </div>
  );
}
