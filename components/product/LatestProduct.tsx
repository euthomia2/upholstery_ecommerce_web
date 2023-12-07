"use client";

import { useDispatch, useSelector } from "react-redux";
import { useGetLatestProductsQuery } from "@/services/crud-product";
import Modal from "../Modal";
import ProductCard from "./ProductCard";
import SkeletonProductCards from "./SkeletonProductCards";
import { useRouter } from "next/navigation";
import { closeModal } from "@/slices/cartSlice";
import Link from "next/link";

const LatestProduct = () => {
  const { data: productsData } = useGetLatestProductsQuery();
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
      <section aria-labelledby="trending-heading" className="bg-gray-50">
        <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
            <h2
              id="trending-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Latest Products
            </h2>
            <Link
              href="/products"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              See everything
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="relative">
            <div className="relative w-full overflow-x-auto">
              <ul
                role="list"
                className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
              >
                {!productsData && <SkeletonProductCards />}

                {productsData?.length === 0 && (
                  <div className="py-8 my-8 bg-gray-100 col-span-4">
                    <p className="text-center w-full text-gray-900 font-semibold">
                      No Latest Products Found..
                    </p>
                  </div>
                )}

                {productsData?.filter(el => el.is_active === 1).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 px-4 sm:hidden">
            <Link
              href="/products"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              See everything
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestProduct;
