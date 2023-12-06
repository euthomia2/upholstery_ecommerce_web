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
import CustomerAccountSettings from "@/components/account-settings/CustomerAccountSettings";
import CustomerProducts from "@/components/customer-products/CustomerProducts";
import { useGetProductsQuery } from "@/services/crud-product";
import { useParams } from "next/navigation";
import CategoryProducts from "@/components/customer-category/CategoryProducts";
import NotFoundCustomer from "@/components/NotFoundCustomer";
import { useGetCategoriesQuery } from "@/services/crud-category";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: productsData, isFetching: productsFetching } =
    useGetProductsQuery();
  const dispatch = useDispatch();
  const params = useParams();
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

  const categoryProducts = useMemo(() => {
    if (productsData && user) {
      return productsData?.filter(
        (el) => convertToSlug(el.category.title) === params.categorySlug
      );
    }

    return [];
  }, [user, productsData]);

  const checkCategory = useMemo(() => {
    if (categoriesData && user) {
      return categoriesData?.find(
        (el) => convertToSlug(el.title) === params.categorySlug
      );
    }

    return null;
  }, [user, categoriesData]);

  useEffect(() => {
    if (!Cookies.get("is_authenticated")) {
      router.push("/");
    }

    dispatch(fetchingProducts());

    setIsLoading(false);

    if (checkCategory) {
      setIsVerified(true);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [dispatch]);

  if (isLoading || isFetching || productsFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  if (!productsFetching && !checkCategory && !isVerified) {
    return <NotFoundCustomer />;
  }

  return (
    <div className="bg-white h-screen">
      <Cart />

      <Header>
        <CategoryProducts
          productsData={categoryProducts}
          category={checkCategory}
        />
      </Header>
    </div>
  );
}
