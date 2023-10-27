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
import SellerDashboardMain from '@/components/seller-dashboard/SellerDashboardMain';
import { useGetShopsQuery } from '@/services/crud-shop';

const SellerDashboardPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller } = useSellerGetUserQuery();
  const { data: shops } = useGetShopsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const sellerShopsCount = useMemo(() => {
    if (shops && seller) {
      return shops?.filter((el) => el.seller.id === seller.id).length;
    }

    return 0;
  }, [seller, shops]);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get('is_authenticated');

    if (!isAuthenticatedCookie) {
      router.push('/seller/login');
    }

    if (user && isAuthenticatedCookie) {
      router.push('/seller/login');
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
    <SellerDashboard>
      <SellerDashboardMain totalShop={sellerShopsCount} />
    </SellerDashboard>
  );
};

export default SellerDashboardPage;
