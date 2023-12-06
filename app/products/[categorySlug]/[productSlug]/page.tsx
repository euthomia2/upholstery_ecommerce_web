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
import { useGetProductBySlugQuery } from "@/services/crud-product";
import { useParams } from "next/navigation";
import CategoryProducts from "@/components/customer-category/CategoryProducts";
import NotFoundCustomer from "@/components/NotFoundCustomer";
import { useGetCategoriesQuery } from "@/services/crud-category";
import CustomerProduct from "@/components/customer-product/CustomerProduct";
import { useGetReviewsQuery } from "@/services/crud-review";

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

export default function ProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const params = useParams();
  const { data: productData, isFetching: productFetching } =
    useGetProductBySlugQuery(convertToSlug(params.productSlug));
  const { data: reviewsData, isFetching: reviewsFetching } =
    useGetReviewsQuery();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  const customerReviews = useMemo(() => {
    if (reviewsData && productData) {
      return reviewsData?.filter((el) => el.product.id == productData.id);
    }

    return [];
  }, [productData, reviewsData]);

  console.log(reviewsData);
  console.log(customerReviews);
  console.log(productData);

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

  if (isLoading || isFetching || productFetching || reviewsFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  if (!productFetching && !isVerified && !checkCategory) {
    return <NotFoundCustomer />;
  }

  return (
    <div className="bg-white h-screen">
      <Cart />

      <Header>
        <CustomerProduct productData={productData} reviews={customerReviews} />
      </Header>
    </div>
  );
}
