import React from "react";
import {
  BuildingStorefrontIcon,
  ClipboardIcon,
  NoSymbolIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  WalletIcon,
  CreditCardIcon,
  HomeIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

type SellerDashboardMainProps = {
  totalShops: number;
  totalOrders: number;
  totalCancelled: number;
  totalReturnRefunds: number;
  totalProducts: number;
};

const SellerDashboardMain: React.FC<SellerDashboardMainProps> = ({
  totalShops,
  totalOrders,
  totalCancelled,
  totalReturnRefunds,
  totalProducts,
}) => {
  const dashboard = [
    {
      name: "Total Shops",
      title: totalShops,
      icon: BuildingStorefrontIcon,
    },
    {
      name: "Total Orders",
      title: totalOrders,
      icon: ClipboardIcon,
    },
    {
      name: "Total Cancellation",
      title: totalCancelled,
      icon: NoSymbolIcon,
    },
    {
      name: "Total Return/Refund",
      title: totalReturnRefunds,
      icon: ReceiptRefundIcon,
    },
    {
      name: "Total Products",
      title: totalProducts,
      icon: ShoppingBagIcon,
    },
    // {
    //   name: "Total Income",
    //   title: "₱0.00",
    //   icon: BanknotesIcon,
    // },
    {
      name: "Total Balance",
      title: "₱0.00",
      icon: WalletIcon,
    },
    {
      name: "Total Bank Accounts",
      title: "0",
      icon: CreditCardIcon,
    },
  ];

  return (
    <>
      <div className="xl:pl-72">
        <main>
          <header className="flex items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div className="flex items-center text-base  leading-7 text-gray-900">
              <span>
                <HomeIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="ml-2 text-gray-400">Home</span>

              <span>
                <ChevronRightIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="text-gray-400">Transactions</span>

              <span>
                <ChevronRightIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="font-semibold">Dashboard</span>
            </div>
          </header>

          {/* Dashboard List */}
          <ul
            role="list"
            className="grid p-8 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {dashboard.map((item) => (
              <li
                key={item.name}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                    </div>
                    <p className="mt-1 truncate text-md text-gray-500">
                      {item.title}
                    </p>
                  </div>
                  <item.icon
                    className="h-8 w-8 shrink-0 text-gray-900"
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default SellerDashboardMain;
