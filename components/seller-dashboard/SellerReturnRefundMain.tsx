import React from "react";

import { HomeIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ReturnRefund } from "@/models/ReturnRefund";
import Link from "next/link";
import { format } from "date-fns";

type SellerReturnRefundMainProps = {
  returnRefunds: ReturnRefund[];
};

const SellerReturnRefundMain: React.FC<SellerReturnRefundMainProps> = ({
  returnRefunds,
}) => {
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

              <span className="font-semibold">Return / Refund</span>
            </div>
          </header>

          {/* ReturnRefund List */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Return / Refund
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the return / refund in your seller centre
                    account.
                  </p>
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
                        className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Product Image
                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Return Refund ID
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action<span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnRefunds.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell"
                        >
                          No Return / Refund Found...
                        </td>
                      </tr>
                    )}

                    {returnRefunds?.map((item) => {
                      const createdDate = new Date(item.created_at);
                      const createdAt = format(createdDate, "yyyy-MM-dd");

                      return (
                        <tr key={item.name}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                              <div className="h-24 w-24 flex-shrink-0">
                                <img
                                  className="h-24 w-24 rounded-md"
                                  src={item.product.image_file}
                                  alt="Product Image"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {item.return_refund_id}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {item.order_id}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                            {item.product.name}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                            {item.customer.first_name} {item.customer.last_name}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                            {item.status === "Pending" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-gray-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {item.status}
                              </span>
                            )}

                            {item.status === "Approved" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-indigo-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {item.status}
                              </span>
                            )}

                            {item.status === "Refunded" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-green-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {item.status}
                              </span>
                            )}

                            {item.status === "Rejected" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-red-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {item.status}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {createdAt}
                          </td>
                          <td className="relative py-4 text-center text-sm font-medium">
                            <Link
                              href={`/seller/return-refund/update/${item.return_refund_id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Update
                            </Link>
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

export default SellerReturnRefundMain;
