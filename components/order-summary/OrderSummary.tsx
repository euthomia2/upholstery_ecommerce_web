import React, { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Product } from '@/models/Product';
import { Customer } from '@/models/Customer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useCreateOrderMutation } from '@/services/crud-order';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import PaymentModal from '../PaymentModal';

type OrderSummaryProps = {
  customer: Customer;
  products: Product[];
  totalPrice: number;
  shippingFee: number;
  totalQuantity: number;
};

const deliveryMethods = [
  {
    id: 1,
    title: 'Cash on Delivery',
    turnaround: 'Pay right after the delivery',
  },
  {
    id: 2,
    title: 'E-Wallet',
    turnaround: 'Pay after confirming the order',
  },
];
const paymentMethods = [
  { id: 'gcash', title: 'GCash', type: 'gcash', url: '/assets/gcash.png' },

  {
    id: 'grab-pay',
    title: 'Grab Pay',
    type: 'grab_pay',
    url: '/assets/grab-pay.png',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Function to Create A Source
const createSource = async (details, type) => {
  //   setPaymentStatus('Creating Source');
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        'sk_test_tmrubUC8AfpmLWeGn9k2EYUR'
      ).toString('base64')}`,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount: details.subtotal_price * 100,
          redirect: {
            success: 'http://localhost:3000/payment',
            failed: 'http://localhost:3000/payment',
          },
          billing: {
            name: `${details.first_name} ${details.last_name}`,
            phone: `${details.contact_number}`,
            email: `${details.email}`,
            address: {
              country: `PH`,
              state: `${details.province}`,
              city: `${details.city}`,
              postal_code: `${details.zip_code}`,
              line1: `${details.street_address} Brgy.${details.barangay}`,
              line2: `${details.street_address} Brgy.${details.barangay}`,
            },
          },
          type,
          currency: 'PHP',
        },
      },
    }),
  };
  return fetch('https://api.paymongo.com/v1/sources', options)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
};

// Function to Listen to the Source in the Front End
const listenToPayment = async (sourceId, setStatus) => {
  let i = 5;
  for (let i = 5; i > 0; i--) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (i == 1) {
      const sourceData = await fetch(
        'https://api.paymongo.com/v1/sources/' + sourceId,
        {
          headers: {
            // Base64 encoded public PayMongo API key.
            Authorization: `Basic ${Buffer.from(
              'sk_test_tmrubUC8AfpmLWeGn9k2EYUR'
            ).toString('base64')}`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });

      console.log(sourceData.attributes.status);

      if (
        sourceData.attributes.status === 'expired' ||
        sourceData.attributes.status === 'cancelled'
      ) {
        setStatus('failed');
        i = 0;
      } else if (sourceData.attributes.status === 'chargeable') {
        setStatus('success');
        i = 0;
      } else {
        i = 5;
      }
    }
  }
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  customer,
  products,
  totalPrice,
  shippingFee,
  totalQuantity,
}) => {
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const subtotalPrice = totalPrice + shippingFee;

  const initialValues = {
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.user.email,
    contact_number: customer.contact_number,
    region: customer.region,
    province: customer.province,
    city: customer.city,
    barangay: customer.barangay,
    zip_code: customer.zip_code,
    street_address: customer.street_address,
    subtotal_price: subtotalPrice,
    product_list: products,
    total_quantity: totalQuantity,
  };

  useEffect(() => {
    if (selectedDeliveryMethod.title === deliveryMethods[0].title) {
      setSelectedPaymentMethod(null);
    }
  }, [selectedDeliveryMethod]);

  return (
    <>
      <PaymentModal
        open={paymentLoading}
        selectedPaymentMethod={selectedPaymentMethod?.title}
        paymentStatus={paymentStatus}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email Address is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          if (
            selectedPaymentMethod &&
            selectedDeliveryMethod.title === 'E-Wallet'
          ) {
            setPaymentLoading(true);
            if (selectedPaymentMethod.title === 'GCash') {
              const source = await createSource(
                values,
                selectedPaymentMethod.type
              );
              console.log(source);
              window.open(
                source.data.attributes.redirect.checkout_url,
                '_blank'
              );
              listenToPayment(source.data.id, setPaymentStatus);
            }

            if (selectedPaymentMethod.title === 'Grab Pay') {
              const source = await createSource(
                values,
                selectedPaymentMethod.type
              );
              console.log(source);
              window.open(
                source.data.attributes.redirect.checkout_url,
                '_blank'
              );
              listenToPayment(source.data.id, setPaymentStatus);
            }
          }
          // createOrder(values)
          //   .unwrap()
          //   .then((payload) => {
          //     router.push('/');

          //     toast.success('Ordered Successfully!');
          //   })
          //   .catch((error) => setErrors({ email: error.data?.message }));
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
          dirty,
          isValid,
        }) => (
          <div className='bg-gray-50'>
            <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
              <h2 className='sr-only'>Checkout</h2>

              <form
                noValidate
                onSubmit={handleSubmit}
                className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'
              >
                <div>
                  <div>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Contact Information
                    </h2>

                    <div className='mt-4'>
                      <label
                        htmlFor='email'
                        className={`${
                          touched.email && errors.email
                            ? 'text-red-500'
                            : 'text-gray-900'
                        }  block text-sm font-medium leading-6 `}
                      >
                        Email Address
                      </label>
                      <div className='mt-1'>
                        <input
                          type='email'
                          id='email'
                          name='email'
                          autoComplete='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled
                          className={`${
                            touched.email && errors.email
                              ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                              : ' ring-gray-300 focus:ring-indigo-600'
                          } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />

                        {touched.email && errors.email && (
                          <p className='text-red-500 text-sm mt-2'>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='mt-10 border-t border-gray-200 pt-10'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Shipping information
                    </h2>

                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                      <div>
                        <label
                          htmlFor='first_name'
                          className={`${
                            touched.first_name && errors.first_name
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          First Name
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='first_name'
                            name='first_name'
                            autoComplete='first_name'
                            value={values.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.first_name && errors.first_name
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='last_name'
                          className={`${
                            touched.last_name && errors.last_name
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          Last Name
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='last_name'
                            name='last_name'
                            autoComplete='last_name'
                            value={values.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.last_name && errors.last_name
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='region'
                          className={`${
                            touched.region && errors.region
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          Region
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='region'
                            name='region'
                            autoComplete='region'
                            value={values.region}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.region && errors.region
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='province'
                          className={`${
                            touched.province && errors.province
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          Province
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='province'
                            name='province'
                            autoComplete='province'
                            value={values.province}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.province && errors.province
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='city'
                          className={`${
                            touched.city && errors.city
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          City
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='city'
                            name='city'
                            autoComplete='city'
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.city && errors.city
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='barangay'
                          className={`${
                            touched.barangay && errors.barangay
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          Barangay
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='barangay'
                            name='barangay'
                            autoComplete='barangay'
                            value={values.barangay}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.barangay && errors.barangay
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='street_address'
                          className={`${
                            touched.street_address && errors.street_address
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          Street Address
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='street_address'
                            name='street_address'
                            autoComplete='street_address'
                            value={values.street_address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.street_address && errors.street_address
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='zip_code'
                          className={`${
                            touched.zip_code && errors.zip_code
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          Zip Code
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='zip_code'
                            name='zip_code'
                            autoComplete='zip_code'
                            value={values.zip_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.zip_code && errors.zip_code
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='contact_number'
                          className={`${
                            touched.contact_number && errors.contact_number
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }  block text-sm font-medium leading-6 `}
                        >
                          Contact Number
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            id='contact_number'
                            name='contact_number'
                            autoComplete='contact_number'
                            value={values.contact_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            className={`${
                              touched.contact_number && errors.contact_number
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block disabled:bg-gray-200 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-10 border-t border-gray-200 pt-10'>
                    <RadioGroup
                      value={selectedDeliveryMethod}
                      onChange={setSelectedDeliveryMethod}
                    >
                      <RadioGroup.Label className='text-lg font-medium text-gray-900'>
                        Payment Method
                      </RadioGroup.Label>

                      <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                        {deliveryMethods.map((deliveryMethod) => (
                          <RadioGroup.Option
                            key={deliveryMethod.id}
                            value={deliveryMethod}
                            className={({ checked, active }) =>
                              classNames(
                                checked
                                  ? 'border-transparent'
                                  : 'border-gray-300',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                              )
                            }
                          >
                            {({ checked, active }) => (
                              <>
                                <span className='flex flex-1'>
                                  <span className='flex flex-col'>
                                    <RadioGroup.Label
                                      as='span'
                                      className='block text-sm font-medium text-gray-900'
                                    >
                                      {deliveryMethod.title}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as='span'
                                      className='mt-1 flex items-center text-sm text-gray-500'
                                    >
                                      {deliveryMethod.turnaround}
                                    </RadioGroup.Description>
                                  </span>
                                </span>
                                {checked ? (
                                  <CheckCircleIcon
                                    className='h-5 w-5 text-indigo-600'
                                    aria-hidden='true'
                                  />
                                ) : null}
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-indigo-500'
                                      : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-lg'
                                  )}
                                  aria-hidden='true'
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {selectedDeliveryMethod.title ===
                    deliveryMethods[1].title && (
                    <div className='mt-10 border-t border-gray-200 pt-10'>
                      <RadioGroup
                        value={selectedPaymentMethod}
                        onChange={setSelectedPaymentMethod}
                      >
                        <RadioGroup.Label className='text-lg font-medium text-gray-900'>
                          E-Wallet Method
                        </RadioGroup.Label>

                        <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                          {paymentMethods.map((paymentMethod) => (
                            <RadioGroup.Option
                              key={paymentMethod.id}
                              value={paymentMethod}
                              className={({ checked, active }) =>
                                classNames(
                                  checked
                                    ? 'border-transparent'
                                    : 'border-gray-300',
                                  active ? 'ring-2 ring-indigo-500' : '',
                                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                )
                              }
                            >
                              {({ checked, active }) => (
                                <>
                                  <span className='flex w-full'>
                                    <span className='flex flex-1 flex-row items-center'>
                                      <RadioGroup.Label
                                        as='p'
                                        className='block text-sm font-medium text-gray-900 mr-1'
                                      >
                                        {paymentMethod.title}
                                      </RadioGroup.Label>
                                      {checked ? (
                                        <CheckCircleIcon
                                          className='h-5 w-5 text-indigo-600'
                                          aria-hidden='true'
                                        />
                                      ) : null}
                                      <img
                                        src={paymentMethod.url}
                                        alt={paymentMethod.title}
                                        className='ml-auto h-8 w-8 rounded-md object-cover object-center'
                                      />
                                    </span>
                                  </span>

                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked
                                        ? 'border-indigo-500'
                                        : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-lg'
                                    )}
                                    aria-hidden='true'
                                  />
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                {/* Order summary */}
                <div className='mt-10 lg:mt-0'>
                  <h2 className='text-lg font-medium text-gray-900'>
                    Order summary
                  </h2>

                  <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-sm'>
                    <h3 className='sr-only'>Items in your cart</h3>
                    <ul
                      role='list'
                      className='divide-y divide-gray-200 text-sm font-medium text-gray-900'
                    >
                      {products.map((product) => (
                        <li
                          key={product.id}
                          className='flex items-start space-x-4 px-4 py-6 sm:px-6'
                        >
                          <img
                            src={product.image_file}
                            alt={product.description}
                            className='h-20 w-20 flex-none rounded-md object-cover object-center'
                          />
                          <div className='flex-auto space-y-1'>
                            <h3>{product.name}</h3>
                            <p className='text-gray-500'>
                              {product.category.title}
                            </p>
                            <p className='text-gray-500'>
                              x {product.quantity}
                            </p>
                          </div>
                          <p className='flex-none text-base font-medium'>
                            ₱
                            {product.price.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <dl className='text-gray-900 space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Subtotal</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          ₱
                          {totalPrice.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Shipping</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          ₱
                          {shippingFee.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </dd>
                      </div>
                      <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                        <dt className='text-base font-medium'>Total</dt>
                        <dd className='text-base font-medium text-gray-900'>
                          ₱
                          {subtotalPrice.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </dd>
                      </div>
                    </dl>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <button
                        type='submit'
                        className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-indigo-200'
                        disabled={
                          isSubmitting ||
                          !isValid ||
                          isLoading ||
                          paymentLoading ||
                          (selectedDeliveryMethod.title === 'E-Wallet' &&
                            !selectedPaymentMethod)
                        }
                      >
                        {isSubmitting || !isValid || isLoading || paymentLoading
                          ? 'Loading...'
                          : 'Confirm Order'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default OrderSummary;
