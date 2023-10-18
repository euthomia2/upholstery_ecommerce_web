import CategoriesHeader from './CategoriesHeader';
import CategoriesMain from './CategoriesMain';

const OverviewCategories = () => {
  return (
    <section aria-labelledby='categories-heading' className='bg-white'>
      <div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32'>
        <CategoriesHeader title='All Categories' navText='See everything' />

        <CategoriesMain />
      </div>
    </section>
  );
};

export default OverviewCategories;
