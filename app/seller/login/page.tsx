'use client';

import { useState, useEffect } from 'react';
import LoginCover from '@/components/seller-login/LoginCover';
import LoginMain from '@/components/seller-login/LoginMain';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const SellerLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Cookies.get('is_authenticated')) {
      router.push('/seller/dashboard');
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
    <div className='flex min-h-full flex-1 '>
      <>
        <LoginMain />
        <LoginCover />
      </>
    </div>
  );
};

export default SellerLogin;
