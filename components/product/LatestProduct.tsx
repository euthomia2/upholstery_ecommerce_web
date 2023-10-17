'use client';

import { useGetProductsQuery } from '@/services/crud-product';
import ProductCard from './ProductCard';

const LatestProduct = () => {
  const { data: productsData } = useGetProductsQuery();

  return (
    <section aria-labelledby='trending-heading' className='bg-white'>
      <div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32'>
        <div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
          <h2
            id='trending-heading'
            className='text-2xl font-bold tracking-tight text-gray-900'
          >
            Latest Products
          </h2>
          <a
            href='#'
            className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
          >
            See everything
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>

        <div className='relative'>
          <div className='relative w-full overflow-x-auto'>
            <ul
              role='list'
              className='mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0'
            >
              {productsData?.map((product) => (
                <ProductCard product={product} />
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-12 px-4 sm:hidden'>
          <a
            href='#'
            className='text-sm font-semibold text-indigo-600 hover:text-indigo-500'
          >
            See everything
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestProduct;
