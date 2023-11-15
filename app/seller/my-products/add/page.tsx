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
import SellerProductsAdd from '@/components/seller-dashboard/SellerProductsAdd';
import { useGetCategoriesQuery } from '@/services/crud-category';
import { useGetShopsQuery } from '@/services/crud-shop';

const SellerMyProductsAddPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: categories, isFetching: categoriesFetching } =
    useGetCategoriesQuery();
  const { data: shops, isFetching: shopsFetching } = useGetShopsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const sellerShops = useMemo(() => {
    if (shops && seller) {
      return shops.filter((el) => el.seller.id === seller.id);
    }

    return [];
  }, [seller, shops]);

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

  if (isLoading || sellerFetching || categoriesFetching || shopsFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <SellerDashboard>
      <SellerProductsAdd
        seller={seller}
        categories={categories}
        shops={sellerShops}
      />
    </SellerDashboard>
  );
};

export default SellerMyProductsAddPage;
