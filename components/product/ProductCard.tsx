'use client';

import { addProduct } from '@/slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <li
      key={product?.id}
      className='inline-flex w-64 flex-col text-center lg:w-auto mt-8 overflow-hidden'
    >
      <div className='group relative mb-6'>
        <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200'>
          <img
            src={product.image_file}
            alt={product.name}
            className='h-full w-full object-cover object-center group-hover:opacity-75'
          />
        </div>
        <div className='mt-6'>
          <p className='text-sm text-gray-500'>{product.category?.title}</p>
          <h3 className='mt-1 font-semibold text-gray-900 truncate whitespace-nowrap'>
            <a href='/'>
              <span className='absolute inset-0' />
              {product.name}
            </a>
          </h3>
          <p className='mt-1 text-gray-900'>
            ₱
            {product.price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className='mt-auto'>
        <button
          onClick={() => dispatch(addProduct(product))}
          className='border rounded-lg border-gray-900 text-gray-900 w-full text-sm py-4 hover:bg-gray-100 duration-150 transition'
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
