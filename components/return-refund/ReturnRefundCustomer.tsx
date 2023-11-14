import React, { useState, useRef } from 'react';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useCustomerUpdatePassMutation } from '@/services/authentication';
import { Customer } from '@/models/Customer';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import { Product } from '@/models/Product';
import { useCreateReturnRefundMutation } from '@/services/crud-return-refund';

type ReturnRefundCustomerProps = {
  customer: Customer;
  product: Product;
  orderId: string;
};

const ReturnRefundCustomer: React.FC<ReturnRefundCustomerProps> = ({
  customer,
  product,
  orderId
}) => {
  const [createReturnRefund, { isLoading }] = useCreateReturnRefundMutation();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState('/assets/empty_product.jpg');
  const [imageFileName, setImageFileName] = useState('');
  const router = useRouter();

  const initialValues = {
    reason: '',
    image_file: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        reason: Yup.string().required('Reason is required').min(30, 'Reason must be at least 30 characters'),
        image_file: Yup.string().required('Image is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const updatedValues = {...values, customer_id: customer.id, order_id: orderId, product_id: product.id, shop_id: product.shop.seller.id}

        createReturnRefund(updatedValues)
          .unwrap()
          .then((payload) => {
            router.push('/my-orders');

            toast.success(
              'Return/Refund Requested Successfully. Please wait for the result of investigation.'
            );
          })
          .catch((error) =>
            setErrors({ reason: error.data?.message })
          );
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
        <div className='bg-white mx-auto max-w-7xl  lg:pb-24'>
          <main>
            <form noValidate onSubmit={handleSubmit}>
              <div className='space-y-12 sm:space-y-16 p-8 '>
                <div>
                  <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                    Return / Refund Request
                  </h1>
                  <p className='mt-2 text-sm text-gray-500'>
                    You can return / refund a product that is defective or has a problem.
                  </p>

                  <div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='product_name'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Product Name
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                          <input
                            id='product_name'
                            type='text'
                            name='product_name'
                            value={product.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`ring-gray-300 disabled:bg-gray-300 focus:ring-indigo-600 block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='shop_name'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Shop Name
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                          <input
                            id='shop_name'
                            type='text'
                            name='shop_name'
                            value={product.shop.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`ring-gray-300 disabled:bg-gray-300 focus:ring-indigo-600 block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='description'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Reason
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <textarea
                          id='reason'
                          name='reason'
                          rows={3}
                          value={values.reason}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.reason && errors.reason
                              ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                              : ' ring-gray-300 focus:ring-indigo-600'
                          } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          defaultValue={''}
                        />
                        {touched.reason && errors.reason && (
                          <p className='text-red-500 text-sm mt-2'>
                            {errors.reason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Product Image
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex flex-col rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md'>
                          <div className='flex flex-col text-center items-center justify-center gap-2 my-4'>
                            <img
                              className='h-48 w-48'
                              alt='Product Image'
                              src={imagePreview}
                            />

                            {imageFileName && (
                              <p className='text-blue-500'>
                                File Name: {imageFileName}
                              </p>
                            )}
                          </div>

                          <button
                            type='button'
                            className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold'
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className='h-6 w-6 mr-2 shrink-0'
                              aria-hidden='true'
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef}
                            name='avatar'
                            accept='image/*'
                            id='contained-button-file'
                            type='file'
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview(fileReader.result);
                                  setFieldValue(
                                    'image_file',
                                    e.target.files[0]
                                  );
                                  setImageFileName(e.target.files[0].name);

                                  console.log(values.image_file);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>
                        {touched.image_file && errors.image_file && (
                          <p className='text-red-500 text-sm mt-2'>
                            {errors.image_file}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-10 flex items-center justify-end gap-x-6'>
                <Link
                  href='/'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Cancel
                </Link>
                <button
                  type='submit'
                  className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200'
                  disabled={isSubmitting || !dirty || !isValid || isLoading}
                >
                  {isSubmitting || isLoading ? 'Loading...' : 'Update'}
                </button>
              </div>
            </form>
          </main>
        </div>
      )}
    </Formik>
  );
};

export default ReturnRefundCustomer;
