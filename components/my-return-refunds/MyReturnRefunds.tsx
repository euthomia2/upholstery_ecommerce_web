import { Customer } from "@/models/Customer";
import Link from "next/link";
import { format } from "date-fns";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderReceivedMutation } from "@/services/crud-order";
import { toast } from "react-hot-toast";
import { ReturnRefund } from "@/models/ReturnRefund";

type MyReturnRefundsProps = {
  customer: Customer;
  returnRefunds: ReturnRefund[];
};

const MyReturnRefunds: React.FC<MyReturnRefundsProps> = ({
  customer,
  returnRefunds,
}) => {
  const [orderReceived, { isLoading }] = useOrderReceivedMutation();
  const router = useRouter();

  const [showOrderReceived, setShowOrderReceived] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [productId, setProductId] = useState(null);

  const runOpenModal = ({ order_id, product_id }) => {
    setShowOrderReceived(true);
    setOrderId(order_id);
    setProductId(product_id);
  };

  const runCloseModal = () => {
    setShowOrderReceived(false);
    setOrderId(null);
    setProductId(null);
  };

  const runOrderReceived = () => {
    orderReceived({
      order_id: orderId,
      product_id: productId,
    })
      .unwrap()
      .then((payload) => {
        router.push(`/my-return-refunds`);
        toast.success("Product Order Received Successfully!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              My Return / Refunds
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Verify the current status of products returned, and amount
              refunded.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent return/refunds</h2>

            <div className="space-y-20">
              {returnRefunds.length === 0 && (
                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                  <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600  sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-full lg:flex-none lg:gap-x-8">
                    <div className="flex  justify-between pt-6 sm:block sm:pt-0">
                      <dt className="text-center text-lg tracking-tight sm:text-xl">
                        <span className=" first-letter:text-gray-900 font-semibold">
                          No Return / Refunds Found..
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
              )}

              {returnRefunds?.map((returnRefund) => {
                const product = returnRefund.product;
                const createdDate = new Date(returnRefund.created_at);
                const createdAt = format(createdDate, "MMMM dd, yyyy");

                return (
                  <div key={returnRefund.return_refund_id}>
                    <h3 className="sr-only">
                      Return Refund on{" "}
                      <time dateTime={createdAt}>{createdAt}</time>
                    </h3>

                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                      <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-2/3 lg:flex-none lg:gap-x-8">
                        <div className="flex col-span-4 py-4 justify-between pt-6 sm:block sm:pt-0">
                          <dt className=" text-xl tracking-tight sm:text-2xl">
                            <span className="text-gray-900 font-semibold">
                              Return / Refund ID:{" "}
                            </span>
                            <span className="text-gray-700 font-medium">
                              {returnRefund.return_refund_id}
                            </span>
                          </dt>
                        </div>
                        <div className="flex justify-between sm:block">
                          <dt className="font-medium text-gray-900">
                            Ordered Date
                          </dt>
                          <dd className="sm:mt-1">
                            <time dateTime={createdAt}>{createdAt}</time>
                          </dd>
                        </div>
                        {/* <div className='flex justify-between pt-6 sm:block sm:pt-0'>
                        <dt className='font-medium text-gray-900'>
                          Total Quantity
                        </dt>
                        <dd className='sm:mt-1'>
                          {order.total_quantity} item(s)
                        </dd>
                      </div>
                      <div className='flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0'>
                        <dt>Subtotal</dt>
                        <dd className='sm:mt-1'>
                          ₱
                          {order.total_price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </dd>
                      </div> */}
                      </dl>
                    </div>

                    <table className="mt-4 w-full text-gray-500 sm:mt-6">
                      <caption className="sr-only">Products</caption>
                      <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                          >
                            Shop's Name
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3 pr-8 font-normal sm:table-cell"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                        <tr key={product.id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={product.image_file}
                                alt={product.image_name}
                                className="mr-6 h-16 w-16 rounded object-cover object-center"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  ₱
                                  {product.price.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                  })}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            ₱
                            {product.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.quantity} item(s)
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.category.title}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.shop.name}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell truncate">
                            {returnRefund.status === "Pending" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
                                <svg
                                  className="h-1.5 w-1.5 fill-gray-400"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {returnRefund.status}
                              </span>
                            )}

                            {returnRefund.status === "Rejected" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-800">
                                <svg
                                  className="h-1.5 w-1.5 fill-red-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {returnRefund.status}
                              </span>
                            )}

                            {returnRefund.status === "Success" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-green-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {returnRefund.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReturnRefunds;
