import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/services/authentication';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email Address is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        login(values)
          .unwrap()
          .then((payload) => {
            const inThreeHours = new Date(
              new Date().getTime() + 3 * 60 * 60 * 1000
            );

            Cookies.set('is_authenticated', true, { expires: inThreeHours });

            router.push('/', { scroll: false });
            setSubmitting(false);
          })
          .catch((error) => setErrors({ email: error.data?.message }));
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
        <form noValidate onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className={`${
                touched.email && errors.email ? 'text-red-500' : 'text-gray-900'
              }  block text-sm font-medium leading-6 `}
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name='email'
                type='email'
                autoComplete='email'
                required
                className={`${
                  touched.email && errors.email
                    ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                    : ' ring-gray-300 focus:ring-indigo-600'
                } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
              />
            </div>
            {touched.email && errors.email && (
              <p className='text-red-500 text-sm mt-2'>{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='password'
              className={`${
                touched.password && errors.password
                  ? 'text-red-500'
                  : 'text-gray-900'
              }  block text-sm font-medium leading-6 `}
            >
              Password
            </label>
            <div className='mt-2'>
              <input
                id='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className={`${
                  touched.password && errors.password
                    ? ' border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 '
                    : ' ring-gray-300 focus:ring-indigo-600'
                } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
              />
            </div>
            {touched.password && errors.password && (
              <p className='text-red-500 text-sm mt-2'>{errors.password}</p>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
              />
              <label
                htmlFor='remember-me'
                className='ml-3 block text-sm leading-6 text-gray-700'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm leading-6'>
              <a
                href='#'
                className='font-semibold text-indigo-600 hover:text-indigo-500'
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200'
              disabled={isSubmitting || !dirty || !isValid || isLoading}
            >
              {isSubmitting || isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
