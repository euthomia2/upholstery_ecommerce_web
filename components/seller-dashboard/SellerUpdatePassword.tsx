import React from 'react';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useSellerUpdatePassMutation } from '@/services/authentication';

const SellerUpdatePassword: React.FC = () => {
  const [updatePass, { isLoading }] = useSellerUpdatePassMutation();
  const router = useRouter();

  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        current_password: Yup.string().required('Current Password is required'),
        new_password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('New Password is required'),
        confirm_new_password: Yup.string()
          .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
          .required('Confirm New Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        updatePass(values)
          .unwrap()
          .then((payload) => {
            Cookies.remove('is_authenticated');

            router.push('/seller/login');

            toast.success(
              'Updated Password Successfully. Please log in again with your new credentials.'
            );
          })
          .catch((error) =>
            setErrors({ current_password: error.data?.message })
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
        <div className='xl:pl-72 bg-white h-full'>
          <main>
            <header className='flex bg-gray-100 items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
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

                <span className='text-gray-400'>Settings</span>

                <span>
                  <ChevronRightIcon
                    className='h-5 w-5 shrink-0 text-gray-900'
                    aria-hidden='true'
                  />
                </span>

                <span className='font-semibold'>Update Password</span>
              </div>
            </header>
            <form noValidate onSubmit={handleSubmit}>
              <div className='space-y-12 sm:space-y-16 p-8 '>
                <div>
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Update Password
                  </h2>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600'>
                    You can change the password of your account in this section.
                  </p>

                  <div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='current_password'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Current Password
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                          <input
                            id='current_password'
                            type='password'
                            name='current_password'
                            value={values.current_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              touched.current_password &&
                              errors.current_password
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                        {touched.current_password &&
                          errors.current_password && (
                            <p className='text-red-500 text-sm mt-2'>
                              {errors.current_password}
                            </p>
                          )}
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='new_password'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        New Password
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                          <input
                            id='new_password'
                            type='password'
                            name='new_password'
                            value={values.new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              touched.new_password && errors.new_password
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                        {touched.new_password && errors.new_password && (
                          <p className='text-red-500 text-sm mt-2'>
                            {errors.new_password}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='confirm_new_password'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Confirm New Password
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                          <input
                            id='confirm_new_password'
                            type='password'
                            name='confirm_new_password'
                            value={values.confirm_new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              touched.confirm_new_password &&
                              errors.confirm_new_password
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                        {touched.confirm_new_password &&
                          errors.confirm_new_password && (
                            <p className='text-red-500 text-sm mt-2'>
                              {errors.confirm_new_password}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-10 flex items-center justify-end gap-x-6'>
                <Link
                  href='/seller/dashboard'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Cancel
                </Link>
                <button
                  type='submit'
                  className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200'
                  disabled={isSubmitting || !dirty || !isValid || isLoading}
                >
                  {isSubmitting || isLoading ? 'Loading...' : 'Save'}
                </button>
              </div>
            </form>
          </main>
        </div>
      )}
    </Formik>
  );
};

export default SellerUpdatePassword;
