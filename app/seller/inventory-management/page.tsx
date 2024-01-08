"use client";

import { useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import SellerDashboard from "@/components/seller-dashboard/SellerDashboard";
import {
  useCustomerGetUserQuery,
  useSellerGetUserQuery,
} from "@/services/authentication";
import SellerProductsMain from "@/components/seller-dashboard/SellerProductsMain";
import { useGetProductsQuery } from "@/services/crud-product";
import SellerInventoryMain from "@/components/seller-dashboard/SellerInventoryMain";
import { useGetOrdersQuery } from "@/services/crud-order";
import { useGetReturnRefundsQuery } from "@/services/crud-return-refund";

const SellerInventoryManagementPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: products, isFetching: productsFetching } =
    useGetProductsQuery();
  const { data: orders, isFetching: ordersFetching } = useGetOrdersQuery();
  const { data: returnRefunds, isFetching: returnRefundsFetching } =
    useGetReturnRefundsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const sellerProducts = useMemo(() => {
    if (products && seller) {
      return products
        .filter((el) => el.shop.seller.id === seller.id)
        .sort((a, b) => b.id - a.id);
    }

    return [];
  }, [seller, products]);

  const sellerOrders = useMemo(() => {
    if (orders && sellerProducts.length > 0) {
      return orders
        .flatMap((order) => JSON.parse(order.products))
        .filter((product) => sellerProducts.some((p) => p.id === product.id))
        .reduce((countMap, product) => {
          const { id, name } = product;
          const key = `${name}`;

          countMap[key] = (countMap[key] || 0) + 1;

          return countMap;
        }, {});
    }

    return [];
  }, [orders, products, sellerProducts]);

  const sellerProductsNeedsRestock = useMemo(() => {
    if (products && seller) {
      return products
        .filter((el) => el.shop.seller.id === seller.id)
        .find((el) => el.quantity === 0);
    }

    return [];
  }, [seller, products]);

  const sellerReturnRefunds = useMemo(() => {
    if (products && returnRefunds) {
      return returnRefunds
        .map((order) => order.product)
        .filter((product) => sellerProducts.some((p) => p.id === product.id))
        .reduce((countMap, product) => {
          const { id, name } = product;
          const key = `${name}`;

          countMap[key] = (countMap[key] || 0) + 1;

          return countMap;
        }, {});
    }

    return [];
  }, [returnRefunds, products]);

  console.log(sellerReturnRefunds);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get("is_authenticated");

    if (!isAuthenticatedCookie) {
      router.push("/seller/login");
    }

    if (user && isAuthenticatedCookie) {
      router.push("/");
    }

    if (seller && isAuthenticatedCookie) {
      setIsLoading(false);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user, seller]);

  if (isLoading || sellerFetching || productsFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  return (
    <SellerDashboard>
      <SellerInventoryMain
        products={sellerProducts}
        seller={seller}
        orders={sellerOrders}
        productsNeedsRestock={sellerProductsNeedsRestock}
        returnRefunds={sellerReturnRefunds}
      />
    </SellerDashboard>
  );
};

export default SellerInventoryManagementPage;
