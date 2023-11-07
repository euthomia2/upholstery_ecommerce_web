'use client';

import Link from 'next/link';
import { Fragment, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  useCustomerGetUserQuery,
  useCustomerLogoutMutation,
} from '@/services/authentication';
import { useRouter } from 'next/navigation';
import LoadingText from '../LoadingText';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/slices/cartSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AuthenticatedNavItem = () => {
  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useCustomerGetUserQuery();
  const router = useRouter();
  const [logout] = useCustomerLogoutMutation();
  const dispatch = useDispatch();

  const handleLogOut = useCallback(async () => {
    dispatch(clearCart());
    const log = await logout()
      .unwrap()
      .then(() => {
        Cookies.remove('is_authenticated');
        router.push('/customer/login');
      })
      .catch((error) => console.log(error));

    return log;
  }, [router, logout]);

  if (isLoading || isFetching) {
    return (
      <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
        <LoadingText />
      </div>
    );
  }

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
          Hi, {user?.first_name} {user?.last_name}
          <ChevronDownIcon
            className='-mr-1 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-4 py-3'>
            <p className='text-sm text-gray-900'>Signed in as</p>
            <p className='truncate text-sm font-medium text-gray-900'>
              {user.user.email}
            </p>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/account-settings'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account Settings
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/update-password'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Update Password
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/my-orders'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  My Orders
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogOut}
                  className={classNames(
                    active ? 'bg-gray-100 text-red-600' : 'text-red-500',
                    'block w-full px-4 py-2 text-left text-sm border-t-2 border-gray-100'
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AuthenticatedNavItem;
