const CategoriesHeader = ({ title, navText }) => {
  return (
    <div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
      <h2
        id='categories-heading'
        className='text-2xl font-bold tracking-tight text-gray-900'
      >
        {title}
      </h2>
      <a
        href='#'
        className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
      >
        {navText}
        <span aria-hidden='true'> &rarr;</span>
      </a>
    </div>
  );
};

export default CategoriesHeader;
