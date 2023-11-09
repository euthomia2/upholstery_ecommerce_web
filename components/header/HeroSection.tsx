import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className='pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40'>
      <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
        <div className='sm:max-w-lg'>
          <h1 className='font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Elevate your space with fresh upholstery and craft styles
          </h1>
          <p className='mt-4 text-xl text-gray-500'>
            Upholstery and crafts have arrived just when you need them most,
            offering a creative outlet and a touch of style for everyone.
          </p>
        </div>
        <div>
          <div className='mt-10'>
            {/* Decorative image grid */}
            <div
              aria-hidden='true'
              className='pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
            >
              <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                <div className='flex items-center space-x-6 lg:space-x-8'>
                  <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                    <div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                      <img
                        src='https://images.unsplash.com/photo-1601056639638-c53c50e13ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80'
                        alt=''
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <img
                        src='https://www.furniturezone.co.nz/wp-content/uploads/2023/05/HOMESTEAD-DINING-CHAIR-760x684.webp'
                        alt=''
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                  </div>
                  <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <img
                        src='https://i5.walmartimages.com/seo/Mini-Sewing-Machine-Portable-Sewing-Machine-Sewing-Machine-For-Student-Tailor_dce852e6-289d-4bf4-89e6-e573dd4fe01f.60063ccbfc2548e35f09156deab0c450.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF'
                        alt=''
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <img
                        src='https://lzd-img-global.slatic.net/g/ff/kf/S245933428581421493389a8ab45d80a54.jpg_720x720q80.jpg'
                        alt=''
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <img
                        src='https://sg-live-01.slatic.net/p/98e5a53472f11ee6347fa0fa8b199fad.jpg'
                        alt=''
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                  </div>
                  <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <img
                        src='https://lzd-img-global.slatic.net/g/p/6624e9815d29d8e969e2f980f119003c.jpg_720x720q80.jpg'
                        alt=''
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <img
                        src='https://lzd-img-global.slatic.net/g/ff/kf/S4c7216c8b3e04a9e9d083d87f7deb7aeG.jpg_720x720q80.jpg'
                        alt=''
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href='/products'
              className='inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700'
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
