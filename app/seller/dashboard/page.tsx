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
import { useGetSellerBalancesQuery } from "@/services/crud-seller-balance";
import { useGetBankAccountsQuery } from "@/services/crud-bank-account";

const SellerDashboardPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: shops, isFetching: shopsFetching } = useGetShopsQuery();
  const { data: bankAccounts, isFetching: bankAccountsFetching } =
    useGetBankAccountsQuery();
  const { data: returnRefunds, isFetching: returnRefundsFetching } =
    useGetReturnRefundsQuery();
  const { data: orders, isFetching: ordersFetching } = useGetOrdersQuery();
  const { data: products, isFetching: productsFetching } =
    useGetProductsQuery();
  const { data: sellerBalances, isFetching: sellerBalancesFetching } =
    useGetSellerBalancesQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalCancelledCount, setTotalCancelledCount] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const sellerShopsCount = useMemo(() => {
    if (shops && seller) {
      return shops?.filter((el) => el.seller.id === seller.id).length;
    }

    return 0;
  }, [seller, shops]);

  const sellerBankAccountsCount = useMemo(() => {
    if (bankAccounts && seller) {
      return bankAccounts?.filter((el) => el.seller.id === seller.id).length;
    }

    return 0;
  }, [seller, bankAccounts]);

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
    shopsFetching ||
    ordersFetching ||
    productsFetching ||
    returnRefundsFetching ||
    sellerBalancesFetching ||
    bankAccountsFetching
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
        totalPendingAmount={totalPending}
        totalBalanceAmount={totalBalance}
        totalBankAccounts={sellerBankAccountsCount}
      />
    </SellerDashboard>
  );
};

export default SellerDashboardPage;
