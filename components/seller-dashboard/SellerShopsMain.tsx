import {
  HomeIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import Link from 'next/link';

const SellerShopsMain = ({ shops }) => {
  return (
    <>
      <div className='xl:pl-72'>
        <main>
          <header className='flex items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
          <div className='flex items-center text-base  leading-7 text-gray-900'>
              <span>
                <HomeIcon
                  className='h-5 w-5 shrink-0 text-gray-900'
                  aria-hidden='true'
                />
              </span>

              <span className='ml-2 text-gray-400'>Home</span>

              <span>
                <ChevronRightIcon
                  className='h-5 w-5 shrink-0 text-gray-900'
                  aria-hidden='true'
                />
              </span>

              <span className='text-gray-400'>Transactions</span>

              <span>
                <ChevronRightIcon
                  className='h-5 w-5 shrink-0 text-gray-900'
                  aria-hidden='true'
                />
              </span>

              <span className='font-semibold'>My Shops</span>
            </div>
          </header>

          {/* Shops List */}
          <div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8'>
              <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                  <h1 className='text-base font-semibold leading-6 text-gray-900'>
                    Shops
                  </h1>
                  <p className='mt-2 text-sm text-gray-700'>
                    A list of all the shops in your seller centre account.
                  </p>
                </div>
                <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
                  <Link
                    href='/seller/my-shops/add'
                    className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Add a shop
                  </Link>
                </div>
              </div>
            </div>
            <div className='mt-8 flow-root bg-white overflow-hidden'>
              <div className='mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8'>
                <table className='w-full text-left'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900'
                      >
                        Shop Name
                        <div className='absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200' />
                        <div className='absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200' />
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                      >
                        Description
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Created At
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Action<span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops?.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className='hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        >
                          No Shops Found...
                        </td>
                      </tr>
                    )}

                    {shops?.map((shop) => {
                      const createdDate = new Date(shop.created_at);
                      const createdAt = format(createdDate, 'yyyy-MM-dd');

                      return (
                        <tr key={shop.name}>
                          <td className='relative py-4 pr-3 text-sm font-medium text-gray-900'>
                            {shop.name}
                            <div className='absolute bottom-0 right-full h-px w-screen bg-gray-100' />
                            <div className='absolute bottom-0 left-0 h-px w-screen bg-gray-100' />
                          </td>
                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {shop.description}
                          </td>
                          <td className='hidden px-3 py-4 text-sm text-gray-500 md:table-cell'>
                            {shop.is_active === 1 && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-green-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Activated
                              </span>
                            )}

                            {shop.is_active === 0 && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-red-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Deactivated
                              </span>
                            )}
                          </td>
                          <td className='px-3 py-4 text-sm text-gray-500 whitespace-nowrap'>
                            {createdAt}
                          </td>
                          <td className='relative py-4 text-center text-sm font-medium'>
                            <Link
                              href={`/seller/my-shops/edit/${shop.name}`}
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Edit
                              <span className='sr-only'>, {shop.name}</span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SellerShopsMain;
