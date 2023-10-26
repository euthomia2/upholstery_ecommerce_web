'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import SellerDashboard from '@/components/seller-dashboard/SellerDashboard';
import { useCustomerGetUserQuery } from '@/services/authentication';
import SellerShopsEdit from '@/components/seller-dashboard/SellerShopsEdit';
import { useParams } from '@/node_modules/next/navigation';
import { useGetShopBySlugQuery } from '@/services/crud-shop';
import NotFound from '@/components/NotFound';

const SellerMyShopsEditPage = () => {
  const params = useParams();
  const { data: user } = useCustomerGetUserQuery();
  const { data: shop, isFetching } = useGetShopBySlugQuery(params.shopSlug);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  if (isFetching || isLoading) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  if (!shop) {
    return <NotFound />;
  }

  return (
    <SellerDashboard>
      <SellerShopsEdit shop={shop} />
    </SellerDashboard>
  );
};

export default SellerMyShopsEditPage;
