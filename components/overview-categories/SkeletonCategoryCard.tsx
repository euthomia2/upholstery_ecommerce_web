import Image from 'next/image';

const SkeletonCategoryCard = () => {
  return (
    <div
      role='status'
      className='max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-300'
    >
      <div className='flex items-center mt-4 space-x-3 w-full'>
        <Image
          height={40}
          width={40}
          className='rounded-full'
          src='/assets/product-placeholder.png'
          alt='Category Tab'
        />
        <div className='relative'>
          <div className='w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2'></div>
          <div className='w-16 h-2 mx-auto bg-gray-200 rounded-full dark:bg-gray-700'></div>
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default SkeletonCategoryCard;
