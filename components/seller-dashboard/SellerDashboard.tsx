'use client';

import { Fragment, useState } from 'react';
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
} from '@heroicons/react/24/outline';
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Deployments', href: '#', icon: ServerIcon, current: true },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
  { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Usages', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
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

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
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
                      <img
                        className='h-8 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                        alt='Your Company'
                      />
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
                                    item.current
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
                                    setting.current
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
            <div className='flex h-16 shrink-0 items-center'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                alt='Your Company'
              />
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
                            item.current
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
                            setting.current
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
                    type='submit'
                    className='flex w-full justify-center items-center py-3 text-sm font-semibold leading-6 text-red-500 hover:bg-gray-500 hover:text-red-600'
                  >
                    <p className='text-center'>Log Out</p>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='xl:pl-72'>
          {/* Sticky search header */}
          <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8'>
            <button
              type='button'
              className='-m-2.5 p-2.5 text-white xl:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-5 w-5' aria-hidden='true' />
            </button>

            <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
              <form className='flex flex-1' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full'>
                  <MagnifyingGlassIcon
                    className='pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500'
                    aria-hidden='true'
                  />
                  <input
                    id='search-field'
                    className='block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm'
                    placeholder='Search...'
                    type='search'
                    name='search'
                  />
                </div>
              </form>
            </div>
          </div>

          <main>
            <header className='flex items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
              <h1 className='text-base font-semibold leading-7 text-gray-900'>
                Deployments
              </h1>
            </header>

            {/* Deployment list */}
            <ul role='list' className='divide-y divide-white/5'>
              {deployments.map((deployment) => (
                <li
                  key={deployment.id}
                  className='relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8'
                >
                  <div className='min-w-0 flex-auto'>
                    <div className='flex items-center gap-x-3'>
                      <h2 className='min-w-0 text-sm font-semibold leading-6 text-gray-900'>
                        <a href={deployment.href} className='flex gap-x-2'>
                          <span className='truncate'>
                            {deployment.teamName}
                          </span>
                          <span className='text-gray-700'>/</span>
                          <span className='whitespace-nowrap'>
                            {deployment.projectName}
                          </span>
                          <span className='absolute inset-0' />
                        </a>
                      </h2>
                    </div>
                    <div className='mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400'>
                      <p className='truncate'>{deployment.description}</p>
                      <svg
                        viewBox='0 0 2 2'
                        className='h-0.5 w-0.5 flex-none fill-gray-300'
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <p className='whitespace-nowrap'>
                        {deployment.statusText}
                      </p>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      environments[deployment.environment],
                      'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {deployment.environment}
                  </div>
                  <ChevronRightIcon
                    className='h-5 w-5 flex-none text-gray-400'
                    aria-hidden='true'
                  />
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
