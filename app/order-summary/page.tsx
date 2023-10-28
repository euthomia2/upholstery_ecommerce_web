'use client';

import { useState, useEffect } from 'react';
import Cart from '@/components/cart/Cart';
import Header from '@/components/header/Header';
import OrderSummary from '@/components/order-summary/OrderSummary';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function OrderSummaryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Cookies.get('is_authenticated')) {
      router.push('/');
    }
    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, []);

  if (isLoading) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <div className='bg-white'>
      <Cart />

      <Header>
        <OrderSummary />
      </Header>
    </div>
  );
}
