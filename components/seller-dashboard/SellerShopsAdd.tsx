import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useCreateShopMutation } from '@/services/crud-shop';
import { useSellerGetUserQuery } from '@/services/authentication';

const SellerShopsAdd = () => {
  const { data: seller, isError } = useSellerGetUserQuery();
  const [createShop, { isLoading }] = useCreateShopMutation();
  const router = useRouter();
  const initialValues = {
    name: '',
    description: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(100).required('Shop Name is required'),
        description: Yup.string()
          .required('Description is required')
          .min(30, 'Description must be at least 30 characters'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        createShop({ ...values, seller_id: seller.id })
          .unwrap()
          .then((payload) => {
            router.push('/seller/my-shops');

            toast.success('Added Shop Successfully!');
          })
          .catch((error) => setErrors({ name: error.data?.message }));
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
              <h1 className='text-base font-semibold leading-7 text-gray-900'>
                My Shops
              </h1>
            </header>
            <form noValidate onSubmit={handleSubmit}>
              <div className='space-y-12 sm:space-y-16 p-8 '>
                <div>
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Add Shop
                  </h2>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600'>
                    You can add a shop that you want in this section.
                  </p>

                  <div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Shop Name
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                          <input
                            id='name'
                            type='text'
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              touched.name && errors.name
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                        {touched.name && errors.name && (
                          <p className='text-red-500 text-sm mt-2'>
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='about'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Description
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <textarea
                          id='description'
                          name='description'
                          rows={3}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.description && errors.description
                              ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                              : ' ring-gray-300 focus:ring-indigo-600'
                          } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          defaultValue={''}
                        />
                        {touched.description && errors.description && (
                          <p className='text-red-500 text-sm mt-2'>
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-10 flex items-center justify-end gap-x-6'>
                <Link
                  href='/seller/my-shops'
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

export default SellerShopsAdd;
