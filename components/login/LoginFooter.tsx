import Link from 'next/link';

const LoginFooter = () => {
  return (
    <>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-200' />
        </div>
        <div className='relative flex justify-center text-sm font-medium leading-6'>
          <span className='bg-white px-6 text-gray-900'>
            Not registered yet?
          </span>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-4'>
        <Link href='/'>
          <button className='flex w-full justify-center rounded-md bg-transparent border-2 border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Create an account
          </button>
        </Link>
      </div>
    </>
  );
};

export default LoginFooter;
