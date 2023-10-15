import Link from 'next/link';

const VisitorNavItem = () => {
  return (
    <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
      <Link
        href='/buyer/login'
        className='text-sm font-medium text-gray-700 hover:text-gray-800'
      >
        Login
      </Link>
      <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
      <a
        href='#'
        className='text-sm font-medium text-gray-700 hover:text-gray-800'
      >
        Create account
      </a>
    </div>
  );
};

export default VisitorNavItem;
