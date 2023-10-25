'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import SignupMain from '@/components/seller-signup/SignupMain';

const SellerSignup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Cookies.get('is_authenticated')) {
      router.push('/');
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
    <div
      className='bg-cover bg-center'
      style={{ backgroundImage: `url('/assets/seller-signup-cover.jpg')` }}
    >
      <SignupMain />
    </div>
  );
};

export default SellerSignup;
