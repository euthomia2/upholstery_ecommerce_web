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
import { Shop } from "@/models/Shop";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/20/solid";
import {
  useCreateFollowMutation,
  useDeleteFollowMutation,
} from "@/services/crud-follow";
import { Customer } from "@/models/Customer";
import { Follow } from "@/models/Follow";
import toast from "react-hot-toast";

type ShopProductsProps = {
  productsData: Product[];
  shopData: Shop;
  customerData: Customer;
  checkFollowStatus: Follow;
};

const ShopProducts: React.FC<ShopProductsProps> = ({
  productsData,
  shopData,
  customerData,
  checkFollowStatus,
}) => {
  const { isLoggedIn, isAddedProduct } = useSelector((state) => state.cart);
  const [createFollow, { isLoading: loadingCreateFollow }] =
    useCreateFollowMutation();
  const [deleteFollow, { isLoading: loadingDeleteFollow }] =
    useDeleteFollowMutation();

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {shopData.name}
              </h1>
              <p className="mt-2 text-sm text-gray-500 max-w-xl text-clamp-2">
                {shopData.description}
              </p>
            </div>
            {!checkFollowStatus && isLoggedIn ? (
              <div>
                <button
                  onClick={() =>
                    createFollow({
                      shop_id: shopData.id,
                      customer_id: customerData.id,
                    })
                      .unwrap()
                      .then((payload) => {
                        toast.success("Followed Shop Successfully");
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-md flex disabled:bg-green-200"
                  disabled={loadingCreateFollow}
                >
                  <UserPlusIcon
                    className="h-6 w-6 text-white-600 mr-2"
                    aria-hidden="true"
                  />
                  Follow
                </button>
              </div>
            ) : null}

            {checkFollowStatus && isLoggedIn ? (
              <div>
                <button
                  onClick={() =>
                    deleteFollow({
                      id: checkFollowStatus.id,
                      shop_id: shopData.id,
                      customer_id: customerData.id,
                    })
                      .unwrap()
                      .then((payload) => {
                        toast.success("Unfollowed Shop Successfully");
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-md flex disabled:bg-red-200"
                  disabled={loadingDeleteFollow}
                >
                  <UserMinusIcon
                    className="h-6 w-6 text-white-600 mr-2"
                    aria-hidden="true"
                  />
                  {loadingDeleteFollow ? "Loading..." : "Unfollow"}
                </button>
              </div>
            ) : null}
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
                className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0 mt-6"
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

export default ShopProducts;
