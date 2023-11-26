"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/services/crud-product";
import Modal from "../Modal";
import ProductCard from "../product/ProductCard";
import SkeletonProductCards from "../product/SkeletonProductCards";
import { useRouter } from "next/navigation";
import { closeModal } from "@/slices/cartSlice";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

type CategoryProductsProps = {
  productsData: Product[];
  category: Category;
};

const CategoryProducts: React.FC<CategoryProductsProps> = ({
  productsData,
  category,
}) => {
  const { isLoggedIn, isAddedProduct } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const router = useRouter();

  const runCloseModal = () => {
    dispatch(closeModal());
  };

  const runLoginNav = () => {
    router.push("/customer/login");
  };

  const runSignUpNav = () => {
    router.push("/customer/signup");
  };

  return (
    <>
      <Modal
        title={`Oops... It look's like you're not logged in yet.`}
        description={`You need to login to your account first. If you don't have an account yet, please don't hesitate to register.`}
        status="failed"
        open={Boolean(!isLoggedIn && isAddedProduct)}
        leftBtnTitle="Login"
        rightBtnTitle="Create Account"
        closeModal={runCloseModal}
        leftBtnFunc={runLoginNav}
        rightBtnFunc={runSignUpNav}
      />
      <section className="h-full">
        <div className="py-8 sm:py-16 lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {category.title}
            </h1>
            <p className="mt-2 text-sm text-gray-500">{category.description}</p>
          </div>

          <div className="relative">
            <div className="relative w-full overflow-x-auto">
              {productsData?.length === 0 && (
                <div className="py-8 my-8 bg-gray-100">
                  <p className="text-center w-full text-gray-900 font-semibold">
                    No Products Found..
                  </p>
                </div>
              )}
              <ul
                role="list"
                className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
              >
                {productsData?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryProducts;
