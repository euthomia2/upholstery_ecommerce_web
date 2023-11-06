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
import MyOrders from '@/components/my-orders/MyOrders';
import { useGetOrdersQuery } from '@/services/crud-order';

export default function MyOrdersPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: orders, isFetching: ordersFetching } = useGetOrdersQuery();
  const dispatch = useDispatch();

  const customerOrders = useMemo(() => {
    if (orders && user) {
      return orders
        ?.filter((el) => el.customer.id === user.id)
        .sort((a, b) => b.id - a.id);
    }

    return 0;
  }, [user, orders]);

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

  if (isLoading || isFetching || ordersFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <div className='bg-white h-screen'>
      <Cart />

      <Header>
        <MyOrders customer={user} orders={customerOrders} />
      </Header>
    </div>
  );
}
