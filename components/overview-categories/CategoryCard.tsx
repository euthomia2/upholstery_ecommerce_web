import Image from 'next/image';

const CategoryCard = ({ category }) => {
  return (
    <div className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'>
      <div className='flex-shrink-0'>
        <Image
          height={40}
          width={40}
          className='rounded-full'
          src='/assets/product-placeholder.png'
          alt='Category Tab'
        />
      </div>
      <div className='min-w-0 flex-1'>
        <a href='#' className='focus:outline-none'>
          <span className='absolute inset-0' aria-hidden='true' />
          <p className='text-sm font-medium text-gray-900'>{category.title}</p>
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
