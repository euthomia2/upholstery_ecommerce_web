import { format } from 'date-fns';

const SellerOrdersMain = ({ orders }) => {
  return (
    <>
      <div className='xl:pl-72'>
        <main>
          <header className='flex items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
            <h1 className='text-base font-semibold leading-7 text-gray-900'>
              My Orders
            </h1>
          </header>

          {/* Orders List */}
          <div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8'>
              <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                  <h1 className='text-base font-semibold leading-6 text-gray-900'>
                    Orders
                  </h1>
                  <p className='mt-2 text-sm text-gray-700'>
                    A list of all the orders in your seller centre account.
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
                        Order ID
                        <div className='absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200' />
                        <div className='absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200' />
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                      >
                        Customer's Name
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Product's Name
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Shop's Name
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Delivery Status
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Active Status
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
                    {orders.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className='hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        >
                          No Orders Found...
                        </td>
                      </tr>
                    )}

                    {orders?.map((order) => {
                      const createdDate = new Date(order.created_at);
                      const createdAt = format(createdDate, 'yyyy-MM-dd');

                      return (
                        <tr key={order.order_id}>
                          <td className='relative py-4 pr-3 text-sm font-medium text-gray-900'>
                            {order.order_id}
                            <div className='absolute bottom-0 right-full h-px w-screen bg-gray-100' />
                            <div className='absolute bottom-0 left-0 h-px w-screen bg-gray-100' />
                          </td>
                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.customer.first_name}{' '}
                            {order.customer.last_name}
                          </td>
                          <td className='hidden px-3 py-4 text-sm text-gray-500 md:table-cell'>
                            {order.product.name}
                          </td>
                          <td className='px-3 py-4 text-sm text-gray-500'>
                            ₱
                            {order.product.price.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className='px-3 py-4 text-sm text-gray-500'>
                            {order.shop.name}
                          </td>
                          <td className='hidden px-3 py-4 text-sm text-gray-500 md:table-cell'>
                            {order.status === 'Processing' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-green-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-gray-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Processing
                              </span>
                            )}

                            {order.status === 'Packed' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-red-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-gray-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Packed
                              </span>
                            )}

                            {order.status === 'Shipped' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-red-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-blue-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Shipped
                              </span>
                            )}

                            {order.status === 'Out For Delivery' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-red-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-blue-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Out For Delivery
                              </span>
                            )}

                            {order.status === 'Delivered' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-red-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-green-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Delivered
                              </span>
                            )}
                          </td>
                          <td className='hidden px-3 py-4 text-sm text-gray-500 md:table-cell'>
                            {order.is_active === 1 && (
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

                            {order.is_active === 0 && (
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
                          <td className='px-3 py-4 text-sm text-gray-500'>
                            {createdAt}
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

export default SellerOrdersMain;
