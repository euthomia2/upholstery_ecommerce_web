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
import { useGetBankAccountsQuery } from "@/services/crud-bank-account";
import { useGetSellerNotificationsQuery } from "@/services/crud-seller-notification";
import SellerNotificationsMain from "@/components/seller-dashboard/SellerNotificationsMain";

const NotificationsPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: sellerNotifications, isFetching: sellerNotificationsFetching } =
    useGetSellerNotificationsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const notificationsSeller = useMemo(() => {
    if (sellerNotifications && seller) {
      return sellerNotifications
        .filter((el) => el.seller.id === seller.id)
        .sort((a, b) => b.id - a.id);
    }

    return [];
  }, [seller, sellerNotifications]);

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

  if (isLoading || sellerFetching || sellerNotificationsFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  return (
    <SellerDashboard>
      <SellerNotificationsMain sellerNotifications={notificationsSeller} />
    </SellerDashboard>
  );
};

export default NotificationsPage;
