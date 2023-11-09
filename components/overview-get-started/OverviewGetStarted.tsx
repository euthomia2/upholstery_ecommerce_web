import Link from 'next/link';
import Image from 'next/image';

const OverviewGetStarted = () => {
  const firstCont = {
    objectFit: 'cover',
    objectPosition: 'center',
  };

  return (
    <section aria-labelledby='category-heading' className='bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
        <div className='sm:flex sm:items-baseline sm:justify-between'>
          <h2
            id='category-heading'
            className='text-2xl font-bold tracking-tight text-gray-900'
          >
            Get Started Today!
          </h2>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8'>
          <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 sm:relative'>
            <Image
              src='/assets/ecommerce-products.jpg'
              fill={true}
              alt='This is the Ecommerce Products Image.'
              className='object-cover object-center group-hover:opacity-75'
            />
            <div
              aria-hidden='true'
              className='bg-gradient-to-b from-transparent to-black opacity-50'
            />
            <div className='flex items-end p-6 sm:absolute sm:inset-0'>
              <div>
                <h3 className='font-semibold text-white'>
                  <Link href='/products'>
                    <span className='absolute inset-0' />
                    Products
                  </Link>
                </h3>
                <p aria-hidden='true' className='mt-1 text-sm text-white'>
                  Visit now
                </p>
              </div>
            </div>
          </div>
          <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
            <Image
              src='/assets/discount-vouchers.jpg'
              fill={true}
              alt='This is the Discount Vouchers Image.'
              className='object-cover object-top group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full'
            />
            <div
              aria-hidden='true'
              className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
            />
            <div className='flex items-end p-6 sm:absolute sm:inset-0'>
              <div>
                <h3 className='font-semibold text-white'>
                  <a href='#'>
                    <span className='absolute inset-0' />
                    Discount Vouchers
                  </a>
                </h3>
                <p aria-hidden='true' className='mt-1 text-sm text-white'>
                  Visit now
                </p>
              </div>
            </div>
          </div>
          <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
            <Image
              src='/assets/check-orders.jpg'
              fill={true}
              alt='This is the Checking of Orders Image.'
              className='object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full'
            />
            <div
              aria-hidden='true'
              className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
            />
            <div className='flex items-end p-6 sm:absolute sm:inset-0'>
              <div>
                <h3 className='font-semibold text-white'>
                  <Link href='/my-orders'>
                    <span className='absolute inset-0' />
                    Orders
                  </Link>
                </h3>
                <p aria-hidden='true' className='mt-1 text-sm text-white'>
                  Visit now
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 sm:hidden'>
          <a
            href='#'
            className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Browse all categories
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OverviewGetStarted;
