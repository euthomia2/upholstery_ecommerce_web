'use client';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = {
  categories: [
    {
      id: 'category',
      name: 'Categories',

      sections: [
        {
          id: 'category',
          name: 'Categories',
          items: [
            { name: 'Fabrics', href: '#' },
            { name: 'Tools', href: '#' },
            { name: 'Kits', href: '#' },
            { name: 'DIY Upholstery', href: '#' },
            { name: 'Materials', href: '#' },
            { name: 'Upholstered Furniture', href: '#' },
            { name: 'Decorative Accessories', href: '#' },
            { name: 'Fabric Dye and Paint', href: '#' },
            { name: 'Custom Crafts and Upholstery Services', href: '#' },
            { name: 'Crafts', href: '#' },
            { name: 'Supplies', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Crafts',
          items: [
            { name: 'Art Supplies', href: '#' },
            { name: 'Drawing and Sketching', href: '#' },
            { name: 'Paper Crafting', href: '#' },
            { name: 'Sewing and Textile Crafts', href: '#' },
            { name: 'Jewelry Making', href: '#' },
            { name: 'Knitting and Crochet', href: '#' },
            { name: 'Woodworking and Carving', href: '#' },
            { name: 'Candle and Soap Making', href: '#' },
            { name: 'Modeling and Sculpting', href: '#' },
            { name: 'Leathercraft', href: '#' },
            { name: 'Floral Crafts', href: '#' },
            { name: 'DIY Home Decor', href: '#' },
          ],
        },
        {
          id: 'upholstery',
          name: 'Upholstery',
          items: [
            { name: 'Upholstery Fabrics', href: '#' },
            { name: 'Foam and Padding', href: '#' },
            { name: 'Upholstery Tools', href: '#' },
            { name: 'Furniture Pieces', href: '#' },
            { name: 'Buttons and Tufting Supplies', href: '#' },
            { name: 'Trim and Tassel Fringe', href: '#' },
            { name: 'Adhesives and Glues', href: '#' },
            { name: 'Nails, Screws, and Fasteners', href: '#' },
            { name: 'Springs and Suspension Systems', href: '#' },
            { name: 'Furniture Frames and Structure', href: '#' },
            { name: 'Cushion Inserts and Filling', href: '#' },
            { name: 'Upholstery Repair Kits', href: '#' },
            { name: 'Cleaning and Care Products', href: '#' },
            { name: 'Fabric Protector Sprays', href: '#' },
            { name: 'Custom Upholstery Services', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [{ name: 'Products', href: '#' }],
};

const trendingProducts = [
  {
    id: 1,
    name: 'Machined Pen',
    color: 'Black',
    price: '$35',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
    imageAlt:
      'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  // More products...
];

const favorites = [
  {
    id: 1,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
];
const footerNavigation = {
  shop: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Redeem a Gift Card', href: '#' },
  ],
  connect: [
    { name: 'Contact Us', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-40 lg:hidden' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                <div className='flex px-4 pb-2 pt-5'>
                  <button
                    type='button'
                    className='-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as='div' className='mt-2'>
                  <div className='border-b border-gray-200'>
                    <Tab.List className='-mb-px flex space-x-8 px-4'>
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className='space-y-10 px-4 pb-8 pt-10'
                      >
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className='font-medium text-gray-900'
                            >
                              {section.name}
                            </p>
                            <ul
                              role='list'
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className='mt-6 flex flex-col space-y-6'
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className='flow-root'>
                                  <a
                                    href={item.href}
                                    className='-m-2 block p-2 text-gray-500'
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  {navigation.pages.map((page) => (
                    <div key={page.name} className='flow-root'>
                      <a
                        href={page.href}
                        className='-m-2 block p-2 font-medium text-gray-900'
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  <div className='flow-root'>
                    <a
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'
                    >
                      Sign in
                    </a>
                  </div>
                  <div className='flow-root'>
                    <a
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6'>
                  <a href='#' className='-m-2 flex items-center p-2'>
                    <img
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      alt=''
                      className='block h-auto w-5 flex-shrink-0'
                    />
                    <span className='ml-3 block text-base font-medium text-gray-900'>
                      CAD
                    </span>
                    <span className='sr-only'>, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className='relative overflow-hidden'>
        {/* Top navigation */}
        <nav
          aria-label='Top'
          className='relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter'
        >
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center'>
              <button
                type='button'
                className='rounded-md bg-white p-2 text-gray-400 lg:hidden'
                onClick={() => setOpen(true)}
              >
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>

              {/* Logo */}
              <div className='ml-4 flex lg:ml-0'>
                <a href='#'>
                  <span className='sr-only'>Your Company</span>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    alt=''
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className='flex'>
                      {({ open }) => (
                        <>
                          <div className='relative flex'>
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus:outline-none'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Popover.Panel className='absolute inset-x-0 top-full bg-white text-sm text-gray-500'>
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className='absolute inset-0 top-1/2 bg-white shadow'
                                aria-hidden='true'
                              />
                              {/* Fake border when menu is open */}
                              <div
                                className='absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8'
                                aria-hidden='true'
                              >
                                <div
                                  className={classNames(
                                    open ? 'bg-gray-200' : 'bg-transparent',
                                    'h-px w-full transition-colors duration-200 ease-out'
                                  )}
                                />
                              </div>

                              <div className='relative'>
                                <div className='mx-auto max-w-7xl px-8'>
                                  <div className='grid grid-cols-2 gap-x-8 gap-y-10 py-16'>
                                    <div className='row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm'>
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className='font-medium text-gray-900'
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role='list'
                                            aria-labelledby={`${section.name}-heading`}
                                            className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className='flex'
                                              >
                                                <a
                                                  href={item.href}
                                                  className='hover:text-gray-800'
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Sign in
                  </a>
                  <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Create account
                  </a>
                </div>

                {/* Search */}
                <div className='flex lg:ml-6'>
                  <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
                    <span className='sr-only'>Search</span>
                    <MagnifyingGlassIcon
                      className='h-6 w-6'
                      aria-hidden='true'
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <a href='#' className='group -m-2 flex items-center p-2'>
                    <ShoppingBagIcon
                      className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      0
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero section */}
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

                <a
                  href='#'
                  className='inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700'
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trending products */}
      <section aria-labelledby='trending-heading' className='bg-white'>
        <div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32'>
          <div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
            <h2
              id='trending-heading'
              className='text-2xl font-bold tracking-tight text-gray-900'
            >
              Trending products
            </h2>
            <a
              href='#'
              className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
            >
              See everything
              <span aria-hidden='true'> &rarr;</span>
            </a>
          </div>

          <div className='relative mt-8'>
            <div className='relative w-full overflow-x-auto'>
              <ul
                role='list'
                className='mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0'
              >
                {trendingProducts.map((product) => (
                  <li
                    key={product.id}
                    className='inline-flex w-64 flex-col text-center lg:w-auto'
                  >
                    <div className='group relative'>
                      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200'>
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className='h-full w-full object-cover object-center group-hover:opacity-75'
                        />
                      </div>
                      <div className='mt-6'>
                        <p className='text-sm text-gray-500'>{product.color}</p>
                        <h3 className='mt-1 font-semibold text-gray-900'>
                          <a href={product.href}>
                            <span className='absolute inset-0' />
                            {product.name}
                          </a>
                        </h3>
                        <p className='mt-1 text-gray-900'>{product.price}</p>
                      </div>
                    </div>

                    <h4 className='sr-only'>Available colors</h4>
                    <ul
                      role='list'
                      className='mt-auto flex items-center justify-center space-x-3 pt-6'
                    >
                      {product.availableColors.map((color) => (
                        <li
                          key={color.name}
                          className='h-4 w-4 rounded-full border border-black border-opacity-10'
                          style={{ backgroundColor: color.colorBg }}
                        >
                          <span className='sr-only'>{color.name}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
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

      <main>
        {/* Category section */}
        <section aria-labelledby='category-heading' className='bg-gray-50'>
          <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
            <div className='sm:flex sm:items-baseline sm:justify-between'>
              <h2
                id='category-heading'
                className='text-2xl font-bold tracking-tight text-gray-900'
              >
                Shop by Category
              </h2>
              <a
                href='#'
                className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
              >
                Browse all categories
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8'>
              <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 sm:relative'>
                <img
                  src='https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg'
                  alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                  className='object-cover object-center group-hover:opacity-75'
                />
                <div
                  aria-hidden='true'
                  className='bg-gradient-to-b from-transparent to-black opacity-50'
                />
                <div className='flex items-end p-6 sm:absolute sm:inset-0'>
                  <div>
                    <h3 className='font-semibold text-white'>
                      <a href='#'>
                        <span className='absolute inset-0' />
                        New Arrivals
                      </a>
                    </h3>
                    <p aria-hidden='true' className='mt-1 text-sm text-white'>
                      Shop now
                    </p>
                  </div>
                </div>
              </div>
              <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
                <img
                  src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg'
                  alt='Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.'
                  className='object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full'
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
                        Accessories
                      </a>
                    </h3>
                    <p aria-hidden='true' className='mt-1 text-sm text-white'>
                      Shop now
                    </p>
                  </div>
                </div>
              </div>
              <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
                <img
                  src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                  alt='Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk.'
                  className='object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full'
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
                        Workspace
                      </a>
                    </h3>
                    <p aria-hidden='true' className='mt-1 text-sm text-white'>
                      Shop now
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

        {/* Featured section */}
        <section aria-labelledby='cause-heading'>
          <div className='relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16'>
            <div className='absolute inset-0 overflow-hidden'>
              <img
                src='https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div
              aria-hidden='true'
              className='absolute inset-0 bg-gray-900 bg-opacity-50'
            />
            <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
              <h2
                id='cause-heading'
                className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
              >
                Long-term thinking
              </h2>
              <p className='mt-3 text-xl text-white'>
                We're committed to responsible, sustainable, and ethical
                manufacturing. Our small-scale approach allows us to focus on
                quality and reduce our impact. We're doing our best to delay the
                inevitable heat-death of the universe.
              </p>
              <a
                href='#'
                className='mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
              >
                Read our story
              </a>
            </div>
          </div>
        </section>

        {/* Favorites section */}
        <section aria-labelledby='favorites-heading'>
          <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
            <div className='sm:flex sm:items-baseline sm:justify-between'>
              <h2
                id='favorites-heading'
                className='text-2xl font-bold tracking-tight text-gray-900'
              >
                Our Favorites
              </h2>
              <a
                href='#'
                className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
              >
                Browse all favorites
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8'>
              {favorites.map((favorite) => (
                <div key={favorite.id} className='group relative'>
                  <div className='h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto'>
                    <img
                      src={favorite.imageSrc}
                      alt={favorite.imageAlt}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  <h3 className='mt-4 text-base font-semibold text-gray-900'>
                    <a href={favorite.href}>
                      <span className='absolute inset-0' />
                      {favorite.name}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{favorite.price}</p>
                </div>
              ))}
            </div>

            <div className='mt-6 sm:hidden'>
              <a
                href='#'
                className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
              >
                Browse all favorites
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section aria-labelledby='sale-heading'>
          <div className='overflow-hidden pt-32 sm:pt-14'>
            <div className='bg-gray-800'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='relative pb-16 pt-48 sm:pb-24'>
                  <div>
                    <h2
                      id='sale-heading'
                      className='text-4xl font-bold tracking-tight text-white md:text-5xl'
                    >
                      Final Stock.
                      <br />
                      Up to 50% off.
                    </h2>
                    <div className='mt-6 text-base'>
                      <a href='#' className='font-semibold text-white'>
                        Shop the sale
                        <span aria-hidden='true'> &rarr;</span>
                      </a>
                    </div>
                  </div>

                  <div className='absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0'>
                    <div className='ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8'>
                      <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg'
                            alt=''
                          />
                        </div>

                        <div className='mt-6 flex-shrink-0 sm:mt-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg'
                            alt=''
                          />
                        </div>

                        <div className='mt-6 flex-shrink-0 sm:mt-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg'
                            alt=''
                          />
                        </div>

                        <div className='mt-6 flex-shrink-0 sm:mt-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby='footer-heading' className='bg-white'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='py-20 xl:grid xl:grid-cols-3 xl:gap-8'>
            <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
              <div className='space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>Shop</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.shop.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-500 hover:text-gray-600'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>Company</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-500 hover:text-gray-600'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>Account</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.account.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-500 hover:text-gray-600'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>Connect</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-500 hover:text-gray-600'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='mt-16 md:mt-16 xl:mt-0'>
              <h3 className='text-sm font-medium text-gray-900'>
                Sign up for our newsletter
              </h3>
              <p className='mt-6 text-sm text-gray-500'>
                The latest deals and savings, sent to your inbox weekly.
              </p>
              <form className='mt-2 flex sm:max-w-md'>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  type='text'
                  autoComplete='email'
                  required
                  className='w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-indigo-500 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                />
                <div className='ml-4 flex-shrink-0'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className='border-t border-gray-200 py-10'>
            <p className='text-sm text-gray-500'>
              Copyright &copy; 2021 Your Company, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
