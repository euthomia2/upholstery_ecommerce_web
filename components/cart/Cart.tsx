'use client';

import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { closeCart, fetchingProducts, removeProduct } from '@/slices/cartSlice';

const Cart = () => {
  const { open, products, totalPrice, isLoading } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingProducts());
  }, [dispatch]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-20'
        onClose={() => dispatch(closeCart())}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Shopping cart
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => dispatch(closeCart())}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {products?.length === 0 ? (
                              <li className='flex flex-col items-center py-6'>
                                <div className='ml-4 flex flex-1 flex-col py-6'>
                                  <div>
                                    <div className='flex justify-between text-xl font-medium text-gray-900'>
                                      <h3>Uhhh Ohhh...it's empty 😢</h3>
                                    </div>
                                  </div>
                                </div>

                                <div className='py-6'>
                                  <img
                                    src='/assets/empty-cart.png'
                                    alt='Empty Cart'
                                    className='h-48 w-48 '
                                  />
                                </div>
                              </li>
                            ) : null}
                            {products?.map((product) => (
                              <li key={product.id} className='flex py-6'>
                                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                  <img
                                    src={product.image_file}
                                    alt={product.description}
                                    className='h-full w-full object-cover object-center'
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>{product.name}</h3>
                                      <p className='ml-4'>
                                        ₱
                                        {product.price.toLocaleString('en-US', {
                                          minimumFractionDigits: 2,
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <p className='text-gray-500'>
                                      Qty: {product.quantity}
                                    </p>

                                    <div className='flex'>
                                      <button
                                        onClick={() =>
                                          dispatch(removeProduct(product))
                                        }
                                        type='button'
                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>
                          ₱
                          {totalPrice.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        Shipping is calculated at checkout.
                      </p>
                      <div className='mt-6'>
                        {products?.length === 0 ? (
                          <button
                            disabled={true}
                            className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-300 px-6 py-3 text-base font-medium text-white shadow-sm '
                          >
                            Checkout
                          </button>
                        ) : (
                          <a
                            href='#'
                            className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                          >
                            Checkout
                          </a>
                        )}
                      </div>
                      <div className='-ml-1 mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          or
                          <button
                            type='button'
                            className='font-medium ml-1 text-indigo-600  hover:text-indigo-500'
                            onClick={() => dispatch(closeCart())}
                          >
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
