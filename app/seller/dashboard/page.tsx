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
import SellerDashboardMain from "@/components/seller-dashboard/SellerDashboardMain";
import { useGetShopsQuery } from "@/services/crud-shop";
import { useGetOrdersQuery } from "@/services/crud-order";
import { useGetProductsQuery } from "@/services/crud-product";
import { useGetReturnRefundsQuery } from "@/services/crud-return-refund";

const SellerDashboardPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: shops, isFetching: shopsFetching } = useGetShopsQuery();
  const { data: returnRefunds, isFetching: returnRefundsFetching } =
    useGetReturnRefundsQuery();
  const { data: orders, isFetching: ordersFetching } = useGetOrdersQuery();
  const { data: products, isFetching: productsFetching } =
    useGetProductsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalCancelledCount, setTotalCancelledCount] = useState(0);

  const sellerShopsCount = useMemo(() => {
    if (shops && seller) {
      return shops?.filter((el) => el.seller.id === seller.id).length;
    }

    return 0;
  }, [seller, shops]);

  const sellerOrdersCount = useMemo(() => {
    if (orders && seller) {
      let totalOrdersCount = 0;

      const ordersFilter = orders.filter((el) => {
        const parseProducts = JSON.parse(el.products);
        const sellerOrderCount = parseProducts.reduce(
          (orderAccumulator, product) => {
            if (
              product.shop.seller.id === seller.id &&
              product.status !== "Cancelled"
            ) {
              return orderAccumulator + 1;
            }
            return orderAccumulator;
          },
          0
        );

        totalOrdersCount += sellerOrderCount;
        return sellerOrderCount > 0;
      }).length;

      setTotalOrdersCount(totalOrdersCount);
      return ordersFilter;
    }

    return 0;
  }, [seller, orders, setTotalOrdersCount]);

  const sellerCancelledCount = useMemo(() => {
    if (orders && seller) {
      let totalOrdersCount = 0;

      const ordersFilter = orders.filter((el) => {
        const parseProducts = JSON.parse(el.products);
        const sellerOrderCount = parseProducts.reduce(
          (orderAccumulator, product) => {
            if (
              product.shop.seller.id === seller.id &&
              product.status === "Cancelled"
            ) {
              return orderAccumulator + 1;
            }
            return orderAccumulator;
          },
          0
        );

        totalOrdersCount += sellerOrderCount;
        return sellerOrderCount > 0;
      }).length;

      setTotalCancelledCount(totalOrdersCount);
      return ordersFilter;
    }

    return 0;
  }, [seller, orders, setTotalOrdersCount]);

  const sellerReturnRefundsCount = useMemo(() => {
    if (returnRefunds && seller) {
      return returnRefunds?.filter(
        (el) => el.product.shop.seller.id === seller.id
      ).length;
    }

    return 0;
  }, [seller, returnRefunds]);

  const sellerProductsCount = useMemo(() => {
    if (products && seller) {
      return products?.filter((el) => el.shop.seller.id === seller.id).length;
    }

    return 0;
  }, [seller, products]);

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

  if (
    isLoading ||
    sellerFetching ||
    shopsFetching ||
    ordersFetching ||
    productsFetching ||
    returnRefundsFetching
  ) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  return (
    <SellerDashboard>
      <SellerDashboardMain
        totalShops={sellerShopsCount}
        totalOrders={totalOrdersCount}
        totalCancelled={totalCancelledCount}
        totalReturnRefunds={sellerReturnRefundsCount}
        totalProducts={sellerProductsCount}
      />
    </SellerDashboard>
  );
};

export default SellerDashboardPage;
