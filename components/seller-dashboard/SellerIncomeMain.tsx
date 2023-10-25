const SellerIncomeMain = () => {
  return (
    <>
      <div className='xl:pl-72'>
        <main>
          <header className='flex items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
            <h1 className='text-base font-semibold leading-7 text-gray-900'>
              Income
            </h1>
          </header>

          {/* Income List */}
          <ul role='list' className='divide-y divide-white/5'>
            <li className='relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8'>
              <div className='min-w-0 flex-auto'>
                <div className='flex items-center gap-x-3'>
                  <h2 className='min-w-0 text-sm font-semibold leading-6 text-gray-900'>
                    <span className='truncate'>Test</span>
                    <span className='text-gray-700'>/</span>
                    <span className='whitespace-nowrap'>Test</span>
                    <span className='absolute inset-0' />
                  </h2>
                </div>
                <div className='mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400'>
                  <p className='truncate'>Test</p>
                  <svg
                    viewBox='0 0 2 2'
                    className='h-0.5 w-0.5 flex-none fill-gray-300'
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className='whitespace-nowrap'>Test</p>
                </div>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default SellerIncomeMain;
