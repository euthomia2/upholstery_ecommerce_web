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
import DiscountVouchers from "@/components/discount-vouchers/DiscountVouchers";
import { useGetVouchersQuery } from "@/services/crud-voucher";
import { useGetShopsQuery } from "@/services/crud-shop";
import Shops from "@/components/shops/Shops";

export default function DiscountVouchersPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: shops, isFetching: shopsFetching } = useGetShopsQuery();

  const customerShops = useMemo(() => {
    if (shops && user) {
      return shops
        ?.filter((el) => el.is_active === 1)
        .sort((a, b) => b.created_at - a.created_at);
    }

    return [];
  }, [user, shops]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Cookies.get("is_authenticated")) {
      router.push("/");
    }

    dispatch(fetchingProducts());

    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [dispatch]);

  if (isLoading || isFetching || shopsFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  return (
    <div className="bg-white h-screen">
      <Cart />

      <Header>
        <Shops shops={customerShops} />
      </Header>
    </div>
  );
}
