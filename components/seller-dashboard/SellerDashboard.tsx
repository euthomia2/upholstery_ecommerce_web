'use client';

import { Fragment, useCallback, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  LockClosedIcon,
  SquaresPlusIcon,
  BuildingStorefrontIcon,
  ClipboardIcon,
  NoSymbolIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  WalletIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { usePathname, useRouter } from 'next/navigation';
import TransparentLogo from '../TransparentLogo';
import { useCustomerLogoutMutation } from '@/services/authentication';
import Cookies from 'js-cookie';

const navigation = [
  {
    name: 'Dashboard',
    href: '/seller/dashboard',
    icon: SquaresPlusIcon,
    current: true,
  },
  {
    name: 'My Shops',
    href: '/seller/my-shops',
    icon: BuildingStorefrontIcon,
    current: false,
  },
  {
    name: 'My Orders',
    href: '/seller/my-orders',
    icon: ClipboardIcon,
    current: false,
  },
  {
    name: 'Cancellation',
    href: '/seller/cancellation',
    icon: NoSymbolIcon,
    current: false,
  },
  {
    name: 'Return/Refund',
    href: '/seller/return-refund',
    icon: ReceiptRefundIcon,
    current: false,
  },
  {
    name: 'My Products',
    href: '/seller/my-products',
    icon: ShoppingBagIcon,
    current: false,
  },
  {
    name: 'My Income',
    href: '/seller/my-income',
    icon: BanknotesIcon,
    current: false,
  },
  {
    name: 'My Balance',
    href: '/seller/my-balance',
    icon: WalletIcon,
    current: false,
  },
  {
    name: 'Bank Accounts',
    href: '/seller/bank-accounts',
    icon: CreditCardIcon,
    current: false,
  },
];
const settings = [
  {
    id: 1,
    name: 'Account Settings',
    href: '#',
    icon: Cog6ToothIcon,
    current: false,
  },
  {
    id: 2,
    name: 'Forgot Password',
    href: '#',
    icon: LockClosedIcon,
    current: false,
  },
];
const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
};
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
};
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  // More deployments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SellerDashboard = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [logout] = useCustomerLogoutMutation();
  const router = useRouter();

  const handleLogOut = useCallback(async () => {
    const log = await logout()
      .unwrap()
      .then(() => {
        Cookies.remove('is_authenticated');
        router.push('/seller/login');
      })
      .catch((error) => console.log(error));

    return log;
  }, [router, logout]);

  return (
    <>
      <div className='bg-gray-100 h-full'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50 xl:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-gray-500'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10'>
                    <div className='flex h-16 shrink-0 items-center'>
                      <a href='/'>
                        <TransparentLogo />
                      </a>
                    </div>
                    <nav className='flex flex-1 flex-col'>
                      <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        <li>
                          <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.href === pathname
                                      ? 'bg-gray-800 text-gray-900'
                                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className='h-6 w-6 shrink-0'
                                    aria-hidden='true'
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className='text-xs font-semibold leading-6 text-gray-400'>
                            Settings
                          </div>
                          <ul role='list' className='-mx-2 mt-2 space-y-1'>
                            {settings.map((setting) => (
                              <li key={setting.name}>
                                <a
                                  href={setting.href}
                                  className={classNames(
                                    setting.href === pathname
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <setting.icon
                                    className='h-6 w-6 shrink-0'
                                    aria-hidden='true'
                                  />
                                  <span className='truncate'>
                                    {setting.name}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className='-mx-6 mt-auto'>
                          <a
                            href='#'
                            className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800'
                          >
                            <img
                              className='h-8 w-8 rounded-full bg-gray-800'
                              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                              alt=''
                            />
                            <span className='sr-only'>Your profile</span>
                            <span aria-hidden='true'>Tom Cook</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5'>
            <div className='flex h-16 gap-4 shrink-0 items-center'>
              <a href='/'>
                <TransparentLogo />
              </a>
              <div>
                <p className='text-black font-semibold'>CCLDO Seller Centre</p>
              </div>
            </div>
            <nav className='flex flex-1 flex-col'>
              <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul role='list' className='-mx-2 space-y-1'>
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.href === pathname
                              ? 'bg-gray-800 text-gray-100'
                              : 'text-gray-900 hover:text-gray-100 hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className='h-6 w-6 shrink-0'
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className='text-md font-semibold leading-6 text-gray-800'>
                    Settings
                  </div>
                  <ul role='list' className='-mx-2 mt-2 space-y-1'>
                    {settings.map((setting) => (
                      <li key={setting.name}>
                        <a
                          href={setting.href}
                          className={classNames(
                            setting.href === pathname
                              ? 'bg-gray-800 text-gray-100'
                              : 'text-gray-900 hover:text-gray-100 hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <setting.icon
                            className='h-6 w-6 shrink-0'
                            aria-hidden='true'
                          />
                          <span className='truncate'>{setting.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className='-mx-6 mt-auto'>
                  <button
                    onClick={handleLogOut}
                    className='flex w-full justify-center items-center py-3 text-sm font-semibold leading-6 text-red-500 hover:bg-gray-500 hover:text-red-600'
                  >
                    <p className='text-center'>Log Out</p>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {props.children}
      </div>
    </>
  );
};

export default SellerDashboard;
