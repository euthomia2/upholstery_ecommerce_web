const CategoriesHeader = ({ title }) => {
  return (
    <div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
      <h2
        id='categories-heading'
        className='text-2xl font-bold tracking-tight text-gray-900'
      >
        {title}
      </h2>
    </div>
  );
};

export default CategoriesHeader;
