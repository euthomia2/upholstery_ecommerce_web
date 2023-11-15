import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { ReturnRefund } from '@/models/ReturnRefund';
import { useUpdateReturnRefundMutation } from '@/services/crud-return-refund';

type SellerReturnRefundEditProps = {
  returnRefund: ReturnRefund;
}

const SellerReturnRefundEdit: React.FC<SellerReturnRefundEditProps> = ({ returnRefund }) => {
  const [updateReturnRefund, { isLoading }] = useUpdateReturnRefundMutation();
  const router = useRouter();

  const initialValues = {
    status: returnRefund.status,
  };

  function findChangedProperties(oldObj, newObj, id: number | undefined) {
    const changedProperties = {};

    // Iterate through the keys of newObj
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        // Check if the key exists in oldObj and the values are different
        if (oldObj[key] !== newObj[key]) {
          changedProperties[key] = newObj[key];
        }
      }
    }

    changedProperties.id = id;

    return changedProperties;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        status: Yup.string().max(100).required('Status is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const updatedValues = findChangedProperties(
          initialValues,
          values,
          returnRefund.id
        );

        updateReturnRefund(updatedValues)
          .unwrap()
          .then((payload) => {
            router.push('/seller/return-refund');

            toast.success('Updated Return Refund Status Successfully!');
          })
          .catch((error) => setErrors({ status: error.data?.message }));
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
              Return/Refund
              </h1>
            </header>
            <form noValidate onSubmit={handleSubmit}>
              <div className='space-y-12 sm:space-y-16 p-8 '>
                <div>
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Update Return/Refund
                  </h2>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600'>
                    You can update a return/refund that you want in this section.
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
                            value={returnRefund.product.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`disabled:bg-gray-300 ring-gray-300 focus:ring-indigo-600 block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='quantity'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Quantity
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                          <input
                            id='quantity'
                            type='number'
                            name='quantity'
                            value={returnRefund.product.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`disabled:bg-gray-300 ring-gray-300 focus:ring-indigo-600 block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='about'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Reason
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <textarea
                          id='reason'
                          name='reason'
                          rows={3}
                          value={returnRefund.reason}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`disabled:bg-gray-300 ring-gray-300 focus:ring-indigo-600 block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          disabled
                          defaultValue={''}
                        />
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='about'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Evidence Provided
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                      <img
                        src={returnRefund.image_file}
                        alt=''
                        className='h-60 w-60 object-cover object-center'
                      />
                      </div>
                    </div>

                    <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                      <label
                        htmlFor='about'
                        className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
                      >
                        Reason
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                          <select
                            id='status'
                            name='status'
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Select Status'
                            className={`${
                              touched.status && errors.status
                                ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                                : ' ring-gray-300 focus:ring-indigo-600'
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          >
                            <option value='' hidden>
                              Select Status
                            </option>
                            <option value='Pending'>
                              Pending
                            </option>
                            <option value='Accepted'>
                              Accepted
                            </option>
                            <option value='Rejected'>
                              Rejected
                            </option>
                          </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-10 flex items-center justify-end gap-x-6'>
                <Link
                  href='/seller/return-refund'
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

export default SellerReturnRefundEdit;
