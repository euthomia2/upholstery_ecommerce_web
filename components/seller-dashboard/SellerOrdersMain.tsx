import React from 'react';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { Order } from '@/models/Order';

type SellerOrdersMainProps = {
  orders: Order[];
};

const SellerOrdersMain: React.FC<SellerOrdersMainProps> = ({ orders }) => {
  console.log(orders);

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

              <span className='font-semibold'>My Orders</span>
            </div>
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
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                      >
                        Products's Name
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Subtotal Price
                      </th>

                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Shipping Fee
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Total Price
                      </th>
                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Total Quantity
                      </th>

                      <th
                        scope='col'
                        className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'
                      >
                        Payment Method
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
                      const totalPrice = order.price + order.shipping_fee;

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
                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.name}
                          </td>
                          <td className='px-3 py-4 text-sm text-gray-500'>
                            ₱
                            {order.price.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className='px-3 py-4 text-sm text-gray-500'>
                            ₱
                            {order.shipping_fee.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className='px-3 py-4 text-sm text-gray-500'>
                            ₱
                            {totalPrice.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className='px-3 py-4 text-sm text-gray-500'>
                            {order.quantity ?? 0} item(s)
                          </td>

                          {/* <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.voucher_code ?? 'N/A'}
                          </td>

                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.discount_mode === 'Price' &&
                              order.price_discount &&
                              '₱'}
                            {order.price_discount ?? 0}
                            {order.discount_mode === 'Percentage' &&
                              order.price_discount &&
                              '%'}
                          </td>

                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.discount_mode === 'Price' &&
                              order.shipping_discount &&
                              '₱'}
                            {order.shipping_discount ?? 0}
                            {order.discount_mode === 'Percentage' &&
                              order.shipping_discount &&
                              '%'}
                          </td> */}

                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.payment_method}
                          </td>

                          <td className='px-3 py-4 text-sm text-gray-500 whitespace-nowrap'>
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
