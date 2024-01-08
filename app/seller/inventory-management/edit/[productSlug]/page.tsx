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
import SellerProductsEdit from '@/components/seller-dashboard/SellerProductsEdit';
import { useGetCategoriesQuery } from '@/services/crud-category';
import { useGetShopsQuery } from '@/services/crud-shop';
import { useParams } from 'next/navigation';
import { useGetProductBySlugQuery } from '@/services/crud-product';
import NotFound from '@/components/NotFound';

const SellerMyProductsEditPage = () => {
  const params = useParams();
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: categories, isFetching: categoriesFetching } =
    useGetCategoriesQuery();
  const { data: shops, isFetching: shopsFetching } = useGetShopsQuery();
  const { data: product, isFetching: productFetching } =
    useGetProductBySlugQuery(params.productSlug);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

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

    if (product) {
      setIsVerified(true);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user, seller, product]);

  if (
    isLoading ||
    sellerFetching ||
    categoriesFetching ||
    shopsFetching ||
    productFetching
  ) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  if (!productFetching && !product && !isVerified) {
    return <NotFound />;
  }

  return (
    <SellerDashboard>
      <SellerProductsEdit
        seller={seller}
        categories={categories}
        shops={sellerShops}
        product={product}
      />
    </SellerDashboard>
  );
};

export default SellerMyProductsEditPage;
