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
import { format } from "date-fns";
import Link from "next/link";
import Modal from "../Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SellerInventoryMain = ({ products, seller }) => {
  const router = useRouter();
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);

  const runCloseModal = () => {
    setShowUnverifiedModal(false);
  };

  const runAccountDetails = () => {
    router.push("/seller/account-details");
  };

  const dashboard = [
    {
      name: "Most Ordered Product",
      title: 0,
      icon: ShoppingBagIcon,
    },
    {
      name: "Most Returned Product",
      title: 0,
      icon: ReceiptRefundIcon,
    },
    {
      name: "Product Needs Restock",
      title: 0,
      icon: NoSymbolIcon,
    },
  ];

  return (
    <>
      <Modal
        title={`Oops... It look's like you're phone number is not verified yet.`}
        description={`You need to verify your phone number first to start ordering.`}
        status="failed"
        open={showUnverifiedModal}
        leftBtnTitle="Back"
        rightBtnTitle="Go to Account Details"
        closeModal={runCloseModal}
        leftBtnFunc={runCloseModal}
        rightBtnFunc={runAccountDetails}
      />

      <div className="xl:pl-72 bg-gray-100">
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

              <span className="font-semibold">Inventory Management</span>
            </div>
          </header>

          <div className="px-8 py-4">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Inventory Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              This is the inventory management of your seller centre account.
            </p>
          </div>

          {/* Dashboard List */}
          <ul
            role="list"
            className="grid p-8 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {dashboard.map((item) => (
              <li
                key={item.name}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900 whitespace-normal">
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

          {/* Products List */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
              <div className="sm:flex sm:flex-end">
                <div className="sm:flex-auto"></div>
                <div className="mt-4 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => {
                      if (!Boolean(seller.contact_number_verified_at)) {
                        setShowUnverifiedModal(true);
                      } else {
                        router.push("/seller/inventory-management/add");
                      }
                    }}
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add stocks
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 flow-root bg-white overflow-hidden">
              <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="relative pl-3 isolate py-3.5 pr-3 text-sm font-semibold text-gray-900"
                      >
                        Product Name
                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Unit Price
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Inventory Value
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 && (
                      <tr>
                        <td
                          colSpan={10}
                          className="hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell"
                        >
                          No Products Found...
                        </td>
                      </tr>
                    )}

                    {products?.map((product) => {
                      const createdDate = new Date(product.created_at);
                      const createdAt = format(createdDate, "yyyy-MM-dd");

                      return (
                        <tr key={product.id}>
                          <td className="relative py-4 px-3 text-sm font-medium text-gray-900">
                            {product.name}
                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {product.description}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            ₱
                            {product.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {product.quantity ?? 0}{" "}
                            {product.quantity ? "pcs" : "pc"}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            ₱
                            {(product.price * product.quantity).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {product.category.title}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {createdAt}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SellerInventoryMain;
