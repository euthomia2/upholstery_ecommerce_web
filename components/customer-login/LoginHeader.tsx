import React from 'react';
import Logo from '../Logo';

interface LoginHeaderProps {
  title: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title }) => {
  return (
    <div>
      <div className='flex items-center gap-4'>
        <a href='/' className='inline-block'>
          <Logo />
        </a>
        <h3 className='text-2xl text-gray-900 font-semibold'>Customer Login</h3>
      </div>
      <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        {title}
      </h2>
    </div>
  );
};

export default LoginHeader;
