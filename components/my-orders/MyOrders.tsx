import { Customer } from '@/models/Customer';
import { Order } from '@/models/Order';
import { format } from 'date-fns';
import React from 'react';

type MyOrdersProps = {
  user: Customer;
  orders: Order[];
};

const MyOrders: React.FC<MyOrdersProps> = ({ user, orders }) => {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24'>
        <div className='max-w-xl'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
            My Orders
          </h1>
          <p className='mt-2 text-sm text-gray-500'>
            Verify the current status of recent orders, handle returns, and
            access invoices.
          </p>
        </div>

        <div className='mt-16'>
          <h2 className='sr-only'>Recent orders</h2>

          <div className='space-y-20'>
            {orders.length === 0 && (
              <div className='rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8'>
                <dl className='flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600  sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-full lg:flex-none lg:gap-x-8'>
                  <div className='flex  justify-between pt-6 sm:block sm:pt-0'>
                    <dt className='text-center text-lg tracking-tight sm:text-xl'>
                      <span className=' first-letter:text-gray-900 font-semibold'>
                        No Orders Found..
                      </span>
                    </dt>
                  </div>
                </dl>
              </div>
            )}

            {orders?.map((order) => {
              const products = JSON.parse(order.products);
              const createdDate = new Date(order.created_at);
              const createdAt = format(createdDate, 'MMMM dd, yyyy');

              return (
                <div key={order.order_id}>
                  <h3 className='sr-only'>
                    Order placed on{' '}
                    <time dateTime={createdAt}>{createdAt}</time>
                  </h3>

                  <div className='rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8'>
                    <dl className='flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-2/3 lg:flex-none lg:gap-x-8'>
                      <div className='flex col-span-4 py-4 justify-between pt-6 sm:block sm:pt-0'>
                        <dt className=' text-xl tracking-tight sm:text-2xl'>
                          <span className='text-gray-900 font-semibold'>
                            Order ID:{' '}
                          </span>
                          <span className='text-gray-700 font-medium'>
                            {order.order_id}
                          </span>
                        </dt>
                      </div>
                      <div className='flex justify-between sm:block'>
                        <dt className='font-medium text-gray-900'>
                          Ordered Date
                        </dt>
                        <dd className='sm:mt-1'>
                          <time dateTime={createdAt}>{createdAt}</time>
                        </dd>
                      </div>
                      <div className='flex justify-between pt-6 sm:block sm:pt-0'>
                        <dt className='font-medium text-gray-900'>
                          Total Quantity
                        </dt>
                        <dd className='sm:mt-1'>
                          {order.total_quantity} item(s)
                        </dd>
                      </div>
                      <div className='flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0'>
                        <dt>Subtotal</dt>
                        <dd className='sm:mt-1'>
                          ₱
                          {order.subtotal_price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </dd>
                      </div>
                    </dl>
                    <a
                      href='#'
                      className='mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto'
                    >
                      View Summary
                      <span className='sr-only'>
                        for order {order.order_id}
                      </span>
                    </a>
                  </div>

                  <table className='mt-4 w-full text-gray-500 sm:mt-6'>
                    <caption className='sr-only'>Products</caption>
                    <thead className='sr-only text-left text-sm text-gray-500 sm:not-sr-only'>
                      <tr>
                        <th
                          scope='col'
                          className='py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3'
                        >
                          Product
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/5 py-3 pr-8 font-normal sm:table-cell'
                        >
                          Price
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/5 py-3 pr-8 font-normal sm:table-cell'
                        >
                          Quantity
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/5 py-3 pr-8 font-normal sm:table-cell'
                        >
                          Category
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/5 py-3 pr-8 font-normal sm:table-cell'
                        >
                          Shop's Name
                        </th>
                        <th
                          scope='col'
                          className='hidden py-3 pr-8 font-normal sm:table-cell'
                        >
                          Status
                        </th>
                        <th
                          scope='col'
                          className='w-0 py-3 text-right font-normal'
                        >
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t'>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className='py-6 pr-8'>
                            <div className='flex items-center'>
                              <img
                                src={product.image_file}
                                alt={product.image_name}
                                className='mr-6 h-16 w-16 rounded object-cover object-center'
                              />
                              <div>
                                <div className='font-medium text-gray-900'>
                                  {product.name}
                                </div>
                                <div className='mt-1 sm:hidden'>
                                  ₱
                                  {product.price.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                  })}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='hidden py-6 pr-8 sm:table-cell'>
                            ₱
                            {product.price.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className='hidden py-6 pr-8 sm:table-cell'>
                            {product.quantity} item(s)
                          </td>
                          <td className='hidden py-6 pr-8 sm:table-cell'>
                            {product.category.title}
                          </td>
                          <td className='hidden py-6 pr-8 sm:table-cell'>
                            {product.shop.name}
                          </td>
                          <td className='hidden py-6 pr-8 sm:table-cell'>
                            {product.status === 'Processing' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600'>
                                <svg
                                  className='h-1.5 w-1.5 fill-gray-400'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {product.status}
                              </span>
                            )}

                            {product.status === 'Packed' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800'>
                                <svg
                                  className='h-1.5 w-1.5 fill-yellow-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {product.status}
                              </span>
                            )}

                            {product.status === 'Shipped' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-md bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-indigo-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {product.status}
                              </span>
                            )}

                            {product.status === 'Out For Delivery' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-blue-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {product.status}
                              </span>
                            )}

                            {product.status === 'Delivered' && (
                              <span className='inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700'>
                                <svg
                                  className='h-1.5 w-1.5 fill-green-500'
                                  viewBox='0 0 6 6'
                                  aria-hidden='true'
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {product.status}
                              </span>
                            )}
                          </td>
                          <td className='whitespace-nowrap py-6 text-right font-medium'>
                            <a href='#' className='text-indigo-600'>
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
