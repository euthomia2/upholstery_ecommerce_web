'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import SellerDashboard from '@/components/seller-dashboard/SellerDashboard';
import {
  useCustomerGetUserQuery,
  useSellerGetUserQuery,
} from '@/services/authentication';
import { useParams } from '@/node_modules/next/navigation';
import NotFound from '@/components/NotFound';
import { useGetReturnRefundBySlugQuery } from '@/services/crud-return-refund';
import SellerReturnRefundEdit from '@/components/seller-dashboard/SellerReturnRefundEdit';

const SellerReturnRefundEditPage = () => {
  const params = useParams();
  const { data: user } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: returnRefund, isFetching } = useGetReturnRefundBySlugQuery(params.returnRefundId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

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

    if (returnRefund) {
      setIsVerified(true);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user, seller]);

  if (isFetching || isLoading || sellerFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  if (!isFetching && !returnRefund && !isVerified) {
    return <NotFound />;
  }

  return (
    <SellerDashboard>
      <SellerReturnRefundEdit returnRefund={returnRefund} />
    </SellerDashboard>
  );
};

export default SellerReturnRefundEditPage;
