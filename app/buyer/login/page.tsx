'use client';

import { useState, useEffect } from 'react';
import LoginCover from '@/components/login/LoginCover';
import LoginMain from '@/components/login/LoginMain';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function Login() {
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
    <div className='flex min-h-full flex-1 '>
      <>
        <LoginMain />
        <LoginCover />
      </>
    </div>
  );
}
