import React from 'react';
import Link from '@/node_modules/next/link';
import Logo from '../Logo';

interface LoginHeaderProps {
  title: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title }) => {
  return (
    <div>
      <Link href='/' className='inline-block'>
        <Logo />
      </Link>
      <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        {title}
      </h2>
    </div>
  );
};

export default LoginHeader;
