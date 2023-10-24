'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import SignupMain from '@/components/customer-signup/SignupMain';

const CustomerSignup = () => {
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
      style={{ backgroundImage: `url('/assets/customer-signup-cover2.jpg')` }}
    >
      <SignupMain />
    </div>
  );
};

export default CustomerSignup;
