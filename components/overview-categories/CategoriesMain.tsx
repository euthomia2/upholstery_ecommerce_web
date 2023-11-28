"use client";

import { useGetCategoriesQuery } from "@/services/crud-category";
import CategoryCard from "./CategoryCard";
import SkeletonCategories from "./SkeletonCategories";

const CategoriesMain = () => {
  const { data: categoriesData } = useGetCategoriesQuery();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-6">
      {!categoriesData && <SkeletonCategories />}

      {categoriesData && categoriesData?.length === 0 && (
        <div className="py-8 my-8 bg-gray-100 sm:col-span-3 md:col-span-4 lg:col-span-6">
          <p className="text-center w-full text-gray-900 font-semibold">
            No Categories Found..
          </p>
        </div>
      )}

      {categoriesData?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesMain;
