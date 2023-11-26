"use client";

import { useState, useEffect, useMemo } from "react";
import Cart from "@/components/cart/Cart";
import Header from "@/components/header/Header";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useDispatch } from "react-redux";
import { useCustomerGetUserQuery } from "@/services/authentication";
import { fetchingProducts } from "@/slices/cartSlice";
import { useGetOrdersQuery } from "@/services/crud-order";
import CustomerProducts from "@/components/customer-products/CustomerProducts";
import { useGetProductsQuery } from "@/services/crud-product";
import { useParams } from "next/navigation";
import CategoryProducts from "@/components/customer-category/CategoryProducts";
import NotFoundCustomer from "@/components/NotFoundCustomer";
import { useGetCategoriesQuery } from "@/services/crud-category";
import { useGetShopBySlugQuery } from "@/services/crud-shop";
import ShopProducts from "@/components/shop-products/ShopProducts";
import { useGetFollowsQuery } from "@/services/crud-follow";

export default function ShopListPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: productsData, isFetching: productsFetching } =
    useGetProductsQuery();
  const { data: followsData, isFetching: followsFetching } =
    useGetFollowsQuery();
  const { data: shopData, isFetching: shopsFetching } = useGetShopBySlugQuery(
    params.shopSlug
  );
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  function convertToSlug(inputString: string) {
    // Convert to lowercase and replace spaces with hyphens
    let slug = inputString.toLowerCase().replace(/\s+/g, "-");

    slug = inputString
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-\&-/g, "-");

    // Remove special characters using regular expressions
    slug = slug.replace(/[^a-z0-9-]/g, "");

    return slug;
  }

  const shopProducts = useMemo(() => {
    if (productsData && user && shopData) {
      return productsData?.filter((el) => el.shop.name === shopData.name);
    }

    return [];
  }, [user, productsData, shopData]);

  const checkUserFollowed = useMemo(() => {
    if (followsData && user && shopData) {
      return followsData?.find(
        (el) => el.shop.id === shopData.id && el.customer.id === user.id
      );
    }

    return {};
  }, [user, followsData, shopData]);

  console.log(checkUserFollowed);

  useEffect(() => {
    if (!Cookies.get("is_authenticated")) {
      router.push("/");
    }

    dispatch(fetchingProducts());

    setIsLoading(false);

    if (productsData && shopData && followsData) {
      setIsVerified(true);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [dispatch, productsData, shopData, followsData]);

  if (
    isLoading ||
    isFetching ||
    productsFetching ||
    shopsFetching ||
    followsFetching
  ) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  if (!productsFetching && !isVerified) {
    return <NotFoundCustomer />;
  }

  return (
    <div className="bg-white h-screen">
      <Cart />

      <Header>
        <ShopProducts
          productsData={shopProducts}
          shopData={shopData}
          customerData={user}
          checkFollowStatus={checkUserFollowed}
        />
      </Header>
    </div>
  );
}
