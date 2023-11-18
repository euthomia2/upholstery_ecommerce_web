"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import SellerDashboard from "@/components/seller-dashboard/SellerDashboard";
import {
  useCustomerGetUserQuery,
  useSellerGetUserQuery,
} from "@/services/authentication";
import { useParams } from "@/node_modules/next/navigation";
import NotFound from "@/components/NotFound";
import SellerBankAccountsEdit from "@/components/seller-dashboard/SellerBankAccountsEdit";
import { useGetBankAccountQuery } from "@/services/crud-bank-account";

const SellerBankAccountsEditPage = () => {
  const params = useParams();
  const { data: user } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: bankAccount, isFetching } = useGetBankAccountQuery(
    params.bankAccountId
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

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

    if (bankAccount) {
      setIsVerified(true);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user, seller, bankAccount]);

  if (isFetching || isLoading || sellerFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  if (!isFetching && !bankAccount && !isVerified) {
    return <NotFound />;
  }

  return (
    <SellerDashboard>
      <SellerBankAccountsEdit bankAccount={bankAccount} />
    </SellerDashboard>
  );
};

export default SellerBankAccountsEditPage;
