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
import SellerBalanceMain from "@/components/seller-dashboard/SellerBalanceMain";
import { useGetSellerBalancesQuery } from "@/services/crud-seller-balance";
import { useGetBankAccountsQuery } from "@/services/crud-bank-account";

const SellerMyBalancePage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: sellerBalances, isFetching: sellerBalancesFetching } =
    useGetSellerBalancesQuery();
  const { data: bankAccounts, isFetching: bankAccountsFetching } =
    useGetBankAccountsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPending, setTotalPending] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const hasBankAccount = useMemo(() => {
    if (bankAccounts && seller) {
      return bankAccounts?.find(
        (el) => el.seller.id === seller.id && el.is_active
      );
    }

    return false;
  }, [seller, bankAccounts]);

  const allSellerBalances = useMemo(() => {
    if (sellerBalances && seller) {
      return sellerBalances
        .filter((el) => el.shop.seller.id === seller.id)
        .sort((a, b) => b.id - a.id);
    }

    return [];
  }, [seller, sellerBalances]);

  const totalPendingCount = useMemo(() => {
    if (allSellerBalances.length > 0) {
      const totalPending = allSellerBalances.reduce((accumulator, el) => {
        if (el.status === "Pending") {
          return accumulator + el.amount;
        }
        return accumulator;
      }, 0);

      setTotalPending(totalPending);
      return totalPending;
    }

    return 0;
  }, [allSellerBalances]);

  const totalBalanceCount = useMemo(() => {
    if (allSellerBalances.length > 0) {
      const totalBalance = allSellerBalances.reduce((accumulator, el) => {
        if (el.status === "Completed") {
          return accumulator + el.amount;
        }
        return accumulator;
      }, 0);
      setTotalBalance(totalBalance);
      return totalBalance;
    }

    return 0;
  }, [allSellerBalances]);

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
    sellerBalancesFetching ||
    bankAccountsFetching
  ) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  return (
    <SellerDashboard>
      <SellerBalanceMain
        seller={seller}
        sellerBalances={allSellerBalances}
        totalPendingAmount={totalPending}
        totalBalanceAmount={totalBalance}
        hasBankAccount={hasBankAccount}
      />
    </SellerDashboard>
  );
};

export default SellerMyBalancePage;
