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
import SellerReturnRefundMain from '@/components/seller-dashboard/SellerReturnRefundMain';
import { useGetReturnRefundsQuery } from '@/services/crud-return-refund';

const SellerMyReturnRefundPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: returnRefunds, isFetching: returnRefundsFetching } = useGetReturnRefundsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const returnRefundsShop = useMemo(() => {
    if (returnRefunds && seller) {
      return returnRefunds
        .filter((el) => el.product.shop.seller.id === seller.id)
        .sort((a, b) => b.id - a.id);
    }

    return [];
  }, [seller, returnRefunds]);

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

  if (isLoading || sellerFetching || returnRefundsFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <SellerDashboard>
      <SellerReturnRefundMain returnRefunds={returnRefundsShop} />
    </SellerDashboard>
  );
};

export default SellerMyReturnRefundPage;
