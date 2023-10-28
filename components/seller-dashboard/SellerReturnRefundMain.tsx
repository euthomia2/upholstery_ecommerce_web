import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
const return_refund = [
  // {
  //   name: 'shpfrntr123',
  //   description:
  //     'This is the item where all of the best quality furnitures will be located',
  //   status: 'Activated',
  //   created_at: '10/26/2023',
  // },
];

const SellerReturnRefundMain = () => {
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

              <span className='font-semibold'>Return / Refund</span>
            </div>
          </header>

          {/* ReturnRefund List */}
          <div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8'>
              <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                  <h1 className='text-base font-semibold leading-6 text-gray-900'>
                    Return / Refund
                  </h1>
                  <p className='mt-2 text-sm text-gray-700'>
                    A list of all the return / refund in your seller centre
                    account.
                  </p>
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
                      <th scope='col' className='relative py-3.5 pl-3'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {return_refund.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className='hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        >
                          No Return / Refund Found...
                        </td>
                      </tr>
                    )}

                    {return_refund?.map((item) => (
                      <tr key={item.name}>
                        <td className='relative py-4 pr-3 text-sm font-medium text-gray-900'>
                          {item.name}
                          <div className='absolute bottom-0 right-full h-px w-screen bg-gray-100' />
                          <div className='absolute bottom-0 left-0 h-px w-screen bg-gray-100' />
                        </td>
                        <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                          {item.description}
                        </td>
                        <td className='hidden px-3 py-4 text-sm text-gray-500 md:table-cell'>
                          {item.status}
                        </td>
                        <td className='px-3 py-4 text-sm text-gray-500'>
                          {item.created_at}
                        </td>
                        <td className='relative py-4 pl-3 text-right text-sm font-medium'>
                          <a
                            href='#'
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            Edit
                            <span className='sr-only'>, {item.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
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

export default SellerReturnRefundMain;
