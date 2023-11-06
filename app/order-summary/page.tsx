'use client';

import { useState, useEffect } from 'react';
import Cart from '@/components/cart/Cart';
import Header from '@/components/header/Header';
import OrderSummary from '@/components/order-summary/OrderSummary';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useCustomerGetUserQuery } from '@/services/authentication';
import { fetchingProducts } from '@/slices/cartSlice';

export default function OrderSummaryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const {
    open,
    isLoading: productsLoading,
    products,
    totalPrice,
    shippingFee,
    totalQuantity,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(products);

  const totalShippingFee = shippingFee * products.length;

  useEffect(() => {
    if (!Cookies.get('is_authenticated')) {
      router.push('/');
    }

    if (Cookies.get('is_authenticated') && !localStorage.getItem('cart')) {
      router.push('/');
    }

    dispatch(fetchingProducts());

    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [dispatch]);

  if (isLoading || isFetching || productsLoading) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <div className='bg-white'>
      <Cart />

      <Header>
        <OrderSummary
          customer={user}
          products={products}
          totalPrice={totalPrice}
          shippingFee={totalShippingFee}
          totalQuantity={totalQuantity}
        />
      </Header>
    </div>
  );
}
