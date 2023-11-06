'use client';

import { useEffect, useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import SellerDashboard from '@/components/seller-dashboard/SellerDashboard';
import {
  useCustomerGetUserQuery,
  useSellerGetUserQuery,
} from '@/services/authentication';
import SellerOrdersMain from '@/components/seller-dashboard/SellerOrdersMain';
import { useGetOrdersQuery } from '@/services/crud-order';

const SellerMyOrdersPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: orders, isFetching: ordersFetching } = useGetOrdersQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const sellerOrders = useMemo(() => {
    if (orders && seller) {
      return orders
        .filter((el) => {
          const parseProducts = JSON.parse(el.products);

          return parseProducts.map((el, i) => {
            return el.shop.seller.id === seller.id;
          });
        })
        .sort((a, b) => b.id - a.id);
    }

    return [];
  }, [seller, orders]);

  console.log(sellerOrders);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get('is_authenticated');

    if (!isAuthenticatedCookie) {
      router.push('/seller/login');
    }

    if (user && isAuthenticatedCookie) {
      router.push('/');
    }

    if (seller && isAuthenticatedCookie) {
      setIsLoading(false);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user, seller]);

  if (isLoading || sellerFetching || ordersFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <SellerDashboard>
      <SellerOrdersMain orders={sellerOrders} />
    </SellerDashboard>
  );
};

export default SellerMyOrdersPage;
