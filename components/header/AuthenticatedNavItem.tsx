'use client';

import Link from 'next/link';
import { useGetUserQuery } from '@/services/authentication';
import LoadingText from '../LoadingText';

const AuthenticatedNavItem = () => {
  const { data: user, isLoading, isFetching, isError } = useGetUserQuery();

  if (isLoading || isFetching) {
    return (
      <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
        <LoadingText />
      </div>
    );
  }

  return (
    <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
      <Link
        href='/'
        className='text-sm font-medium text-gray-700 hover:text-gray-800'
      >
        Hi, {user.first_name} {user.last_name}
      </Link>
      <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
    </div>
  );
};

export default AuthenticatedNavItem;
