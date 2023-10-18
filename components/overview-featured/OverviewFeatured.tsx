import Image from 'next/image';

const OverviewFeatured = () => {
  const imageStyles = {
    objectFit: 'cover',
    objectPosition: 'center',
  };

  return (
    <section aria-labelledby='cause-heading'>
      <div className='relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16'>
        <div className='absolute inset-0 overflow-hidden'>
          <Image
            src='/assets/warehouse-check.jpg'
            fill={true}
            alt='Warehouse Quality Check'
            style={imageStyles}
          />
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-gray-900 bg-opacity-75'
        />
        <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
          <h2
            id='cause-heading'
            className='text-5xl font-bold tracking-tight text-white sm:text-4xl'
          >
            Quality-Driven, Future-Focused
          </h2>
          <p className='mt-6 text-xl text-white'>
            The products available in our e-commerce store undergoes a rigorous
            quality check to ensure it meets our commitment to long-term
            thinking, responsible manufacturing, and ethical production,
            reflecting our dedication to sustainability and a smaller
            environmental footprint.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OverviewFeatured;
