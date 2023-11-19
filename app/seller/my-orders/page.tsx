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
import SellerOrdersMain from "@/components/seller-dashboard/SellerOrdersMain";
import { useGetOrdersQuery } from "@/services/crud-order";

const SellerMyOrdersPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: orders, isFetching: ordersFetching } = useGetOrdersQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);

  const sellerOrders = useMemo(() => {
    if (orders && seller) {
      let allOrders = [];

      const ordersFilters = orders.filter((orderEl) => {
        const parseProducts = JSON.parse(orderEl.products);

        const sellerProducts = parseProducts.filter((el, i) => {
          return el.shop.seller.id === seller.id && el.status !== "Cancelled";
        });

        if (sellerProducts.length !== 0) {
          const totalOrders = sellerProducts.map((el) => {
            return { ...el, ...orderEl, products: undefined };
          });

          allOrders.push(...totalOrders);
        }
        return [];
      });

      setAllOrders(allOrders);
    }

    return [];
  }, [seller, orders]);

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

  if (isLoading || sellerFetching || ordersFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  return (
    <SellerDashboard>
      <SellerOrdersMain orders={allOrders.sort((a, b) => b.id - a.id)} />
    </SellerDashboard>
  );
};

export default SellerMyOrdersPage;
