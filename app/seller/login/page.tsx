'use client';

import { useState, useEffect } from 'react';
import LoginCover from '@/components/seller-login/LoginCover';
import LoginMain from '@/components/seller-login/LoginMain';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useCustomerGetUserQuery } from '@/services/authentication';

const SellerLogin = () => {
  const router = useRouter();
  const { data: user, isError } = useCustomerGetUserQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get('is_authenticated');

    if (user && isAuthenticatedCookie) {
      router.push('/');
    }

    if (!user && isAuthenticatedCookie) {
      router.push('/seller/dashboard');
    }

    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user]);

  if (isLoading) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <div className='flex min-h-full flex-1 '>
      <>
        <LoginMain />
        <LoginCover />
      </>
    </div>
  );
};

export default SellerLogin;
