import React from 'react';
import Link from '@/node_modules/next/link';
import Logo from '../Logo';

interface LoginHeaderProps {
  title: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title }) => {
  return (
    <div>
      <div className='flex items-center gap-4'>
        <Link href='/' className='inline-block'>
          <Logo />
        </Link>
        <h3 className='text-2xl text-gray-900 font-semibold'>Seller Login</h3>
      </div>
      <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        {title}
      </h2>
    </div>
  );
};

export default LoginHeader;
