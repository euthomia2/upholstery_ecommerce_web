'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/header/Header';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useDispatch } from 'react-redux';
import { useCustomerGetUserQuery } from '@/services/authentication';
import { useGetOrdersQuery } from '@/services/crud-order';
import NotFoundCustomer from '@/components/NotFoundCustomer';
import AfterOrderScreen from '@/components/my-orders/AfterOrderScreen';

export default function AfterOrderPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: orders, isFetching: ordersFetching } = useGetOrdersQuery();
  const dispatch = useDispatch();
  const params = useParams();
  const [isVerified, setIsVerified] = useState(false);

  const checkOrderId = useMemo(() => {
    if (orders && user) {
      return orders?.find((el) => el.order_id === params.orderId);
    }

    return null;
  }, [user, orders]);

  useEffect(() => {
    if (!Cookies.get('is_authenticated')) {
      router.push('/');
    }

    setIsLoading(false);

    if (checkOrderId) {
      setIsVerified(true);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [dispatch, user]);

  if (isLoading || isFetching || ordersFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  if (!ordersFetching && !checkOrderId && !isVerified) {
    return <NotFoundCustomer />;
  }

  return (
    <div className='bg-white h-screen'>
      <AfterOrderScreen customer={user} order={checkOrderId} />
    </div>
  );
}
