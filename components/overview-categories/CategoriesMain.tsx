'use client';

import { useGetCategoriesQuery } from '@/services/crud-category';
import CategoryCard from './CategoryCard';
import SkeletonCategories from './SkeletonCategories';

const CategoriesMain = () => {
  const { data: categoriesData } = useGetCategoriesQuery();

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-6'>
      {!categoriesData || categoriesData?.length === 0 ? (
        <SkeletonCategories />
      ) : null}

      {categoriesData?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesMain;
