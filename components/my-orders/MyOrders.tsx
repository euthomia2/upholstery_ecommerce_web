import { Customer } from "@/models/Customer";
import { Order } from "@/models/Order";
import Link from "next/link";
import { format } from "date-fns";
import React, { useState } from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import {
  useOrderCancelledMutation,
  useOrderReceivedMutation,
} from "@/services/crud-order";
import { toast } from "react-hot-toast";
import { ReturnRefund } from "@/models/ReturnRefund";
import CancelOrderModal from "../CancelOrderModal";
import WriteReviewModal from "../WriteReviewModal";
import { Review } from "@/models/Review";

type MyOrdersProps = {
  customer: Customer;
  orders: Order[];
  returnRefunds: ReturnRefund[];
  reviews: Review[];
};

const MyOrders: React.FC<MyOrdersProps> = ({
  customer,
  orders,
  returnRefunds,
  reviews,
}) => {
  const [orderReceived, { isLoading: receivedCancelled }] =
    useOrderReceivedMutation();
  const [orderCancelled, { isLoading: loadingCancelled }] =
    useOrderCancelledMutation();
  const router = useRouter();

  const [showOrderReceived, setShowOrderReceived] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productShop, setProductShop] = useState(null);

  const runOpenModal = ({ order_id, product_id }) => {
    setShowOrderReceived(true);
    setOrderId(order_id);
    setProductId(product_id);
  };

  const runOpenCancelModal = ({ order_id, product_id }) => {
    setShowCancelOrder(true);
    setOrderId(order_id);
    setProductId(product_id);
  };

  const runOpenReviewModal = ({
    order_id,
    product_id,
    shop_id,
    customer_id,
    product_image,
    product_name,
    product_price,
    product_shop,
  }) => {
    setShowReview(true);
    setOrderId(order_id);
    setProductId(product_id);
    setShopId(shop_id);
    setCustomerId(customer_id);
    setProductImage(product_image);
    setProductName(product_name);
    setProductPrice(product_price);
    setProductShop(product_shop);
  };

  const runCloseModal = () => {
    setShowOrderReceived(false);
    setOrderId(null);
    setProductId(null);
  };

  const runCloseCancelModal = () => {
    setShowCancelOrder(false);
    setOrderId(null);
    setProductId(null);
  };

  const runCloseReviewModal = () => {
    setShowReview(false);
    setOrderId(null);
    setProductId(null);
    setShopId(null);
    setCustomerId(null);
    setProductImage(null);
    setProductName(null);
    setProductPrice(null);
    setProductShop(null);
  };

  const runOrderReceived = () => {
    orderReceived({
      order_id: orderId,
      product_id: productId,
    })
      .unwrap()
      .then((payload) => {
        router.push(`/my-orders`);
        toast.success("Product Order Received Successfully!");
      })
      .catch((error) => console.log(error));
  };

  const runOrderCancelled = () => {
    orderCancelled({
      order_id: orderId,
      product_id: productId,
    })
      .unwrap()
      .then((payload) => {
        router.push(`/my-orders`);
        toast.success("Product Order Cancelled Successfully!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Modal
        title={`Are you sure that you've already received the product?`}
        description={`Once you continue, you can never return or refund the product. Please carefully review your order before proceeding.`}
        status="failed"
        open={Boolean(showOrderReceived)}
        leftBtnTitle="Back"
        rightBtnTitle="Continue"
        closeModal={runCloseModal}
        leftBtnFunc={runCloseModal}
        rightBtnFunc={runOrderReceived}
      />

      <CancelOrderModal
        title={`Are you sure you want to cancel the order for this product?`}
        description={`Once you continue, your order will be tagged as cancelled. Please carefully review your decision before proceeding.`}
        status="failed"
        open={Boolean(showCancelOrder)}
        leftBtnTitle="Back"
        rightBtnTitle="Continue"
        closeModal={runCloseCancelModal}
        leftBtnFunc={runCloseCancelModal}
        rightBtnFunc={runOrderCancelled}
      />

      <WriteReviewModal
        customerId={customerId}
        orderId={orderId}
        shopId={shopId}
        productId={productId}
        productImage={productImage}
        productName={productName}
        productPrice={productPrice}
        productShop={productShop}
        open={showReview}
        closeModal={runCloseReviewModal}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              My Orders
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Verify the current status of recent orders, handle returns, and
              access invoices.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-20">
              {orders.length === 0 && (
                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                  <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600  sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-full lg:flex-none lg:gap-x-8">
                    <div className="flex  justify-between pt-6 sm:block sm:pt-0">
                      <dt className="text-center text-lg tracking-tight sm:text-xl">
                        <span className=" first-letter:text-gray-900 font-semibold">
                          No Orders Found..
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
              )}

              {orders?.map((order) => {
                const products = JSON.parse(order.products);
                const createdDate = new Date(order.created_at);
                const createdAt = format(createdDate, "MMMM dd, yyyy");

                return (
                  <div key={order.order_id}>
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={createdAt}>{createdAt}</time>
                    </h3>

                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                      <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-2/3 lg:flex-none lg:gap-x-8">
                        <div className="flex col-span-4 py-4 justify-between pt-6 sm:block sm:pt-0">
                          <dt className=" text-xl tracking-tight sm:text-2xl">
                            <span className="text-gray-900 font-semibold">
                              Order ID:{" "}
                            </span>
                            <span className="text-gray-700 font-medium">
                              {order.order_id}
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
                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                          <dt className="font-medium text-gray-900">
                            Total Quantity
                          </dt>
                          <dd className="sm:mt-1">
                            {order.total_quantity} item(s)
                          </dd>
                        </div>
                        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                          <dt>Subtotal</dt>
                          <dd className="sm:mt-1">
                            ₱
                            {order.total_price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </dd>
                        </div>
                      </dl>
                      <Link
                        href={`/my-orders/details/${order.order_id}`}
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                      >
                        View Summary
                        <span className="sr-only">
                          for order {order.order_id}
                        </span>
                      </Link>
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
                          <th
                            scope="col"
                            className="hidden py-3 pr-8 font-normal sm:table-cell"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                        {products.map((product) => (
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
                              {product.status === "Processing" && (
                                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
                                  <svg
                                    className="h-1.5 w-1.5 fill-gray-400"
                                    viewBox="0 0 6 6"
                                    aria-hidden="true"
                                  >
                                    <circle cx={3} cy={3} r={3} />
                                  </svg>
                                  {product.status}
                                </span>
                              )}

                              {product.status === "Cancelled" && (
                                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-600">
                                  <svg
                                    className="h-1.5 w-1.5 fill-red-400"
                                    viewBox="0 0 6 6"
                                    aria-hidden="true"
                                  >
                                    <circle cx={3} cy={3} r={3} />
                                  </svg>
                                  {product.status}
                                </span>
                              )}

                              {product.status === "Packed" && (
                                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                                  <svg
                                    className="h-1.5 w-1.5 fill-yellow-500"
                                    viewBox="0 0 6 6"
                                    aria-hidden="true"
                                  >
                                    <circle cx={3} cy={3} r={3} />
                                  </svg>
                                  {product.status}
                                </span>
                              )}

                              {product.status === "Shipped" && (
                                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                                  <svg
                                    className="h-1.5 w-1.5 fill-indigo-500"
                                    viewBox="0 0 6 6"
                                    aria-hidden="true"
                                  >
                                    <circle cx={3} cy={3} r={3} />
                                  </svg>
                                  {product.status}
                                </span>
                              )}

                              {product.status === "Out For Delivery" && (
                                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                                  <svg
                                    className="h-1.5 w-1.5 fill-blue-500"
                                    viewBox="0 0 6 6"
                                    aria-hidden="true"
                                  >
                                    <circle cx={3} cy={3} r={3} />
                                  </svg>
                                  {product.status}
                                </span>
                              )}

                              {product.status === "Delivered" &&
                                !Boolean(product.order_received) &&
                                !Boolean(
                                  returnRefunds.find(
                                    (el) =>
                                      el.order_id == order.order_id &&
                                      el.product.id == product.id &&
                                      el.customer.id == customer.id
                                  )
                                ) && (
                                  <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                                    <svg
                                      className="h-1.5 w-1.5 fill-green-500"
                                      viewBox="0 0 6 6"
                                      aria-hidden="true"
                                    >
                                      <circle cx={3} cy={3} r={3} />
                                    </svg>
                                    {product.status}
                                  </span>
                                )}

                              {product.status === "Delivered" &&
                                Boolean(product.order_received) &&
                                !Boolean(
                                  returnRefunds.find(
                                    (el) =>
                                      el.order_id == order.order_id &&
                                      el.product.id == product.id &&
                                      el.customer.id == customer.id
                                  )
                                ) && (
                                  <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                                    <svg
                                      className="h-1.5 w-1.5 fill-green-500"
                                      viewBox="0 0 6 6"
                                      aria-hidden="true"
                                    >
                                      <circle cx={3} cy={3} r={3} />
                                    </svg>
                                    Order Received
                                  </span>
                                )}

                              {product.status === "Delivered" &&
                                !Boolean(product.order_received) &&
                                Boolean(
                                  returnRefunds.find(
                                    (el) =>
                                      el.order_id == order.order_id &&
                                      el.product.id == product.id &&
                                      el.customer.id == customer.id
                                  )
                                ) && (
                                  <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-700">
                                    <svg
                                      className="h-1.5 w-1.5 fill-yellow-500"
                                      viewBox="0 0 6 6"
                                      aria-hidden="true"
                                    >
                                      <circle cx={3} cy={3} r={3} />
                                    </svg>
                                    Return Requested
                                  </span>
                                )}
                            </td>
                            <td className="whitespace-nowrap py-6 text-right font-medium space-y-4">
                              <div className="flex items-center justify-between gap-4">
                                <div className="w-full">
                                  <button
                                    onClick={() =>
                                      runOpenModal({
                                        order_id: order.id,
                                        product_id: product.id,
                                      })
                                    }
                                    className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200"
                                    disabled={
                                      product.status !== "Delivered" ||
                                      product.order_received ||
                                      Boolean(
                                        returnRefunds.find(
                                          (el) =>
                                            el.order_id == order.order_id &&
                                            el.product.id == product.id &&
                                            el.customer.id == customer.id
                                        )
                                      )
                                    }
                                  >
                                    Order Received
                                  </button>
                                </div>
                                <div className="w-full">
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/my-orders/return-refund/${order.order_id}/${product.id}`
                                      )
                                    }
                                    className="w-full rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:bg-gray-200"
                                    disabled={
                                      product.status !== "Delivered" ||
                                      product.order_received ||
                                      Boolean(
                                        returnRefunds.find(
                                          (el) =>
                                            el.order_id == order.order_id &&
                                            el.product.id == product.id &&
                                            el.customer.id == customer.id
                                        )
                                      )
                                    }
                                  >
                                    Return / Refund
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <div className="w-full">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      runOpenCancelModal({
                                        order_id: order.id,
                                        product_id: product.id,
                                      })
                                    }
                                    className="w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-200"
                                    disabled={product.status !== "Processing"}
                                  >
                                    Cancel Order
                                  </button>
                                </div>

                                <div className="w-full">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      runOpenReviewModal({
                                        order_id: order.order_id,
                                        product_id: product.id,
                                        shop_id: product.shop.id,
                                        customer_id: order.customer.id,
                                        product_image: product.image_file,
                                        product_name: product.name,
                                        product_price: product.price,
                                        product_shop: product.shop.name,
                                      });
                                    }}
                                    className="w-full rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:bg-yellow-200"
                                    disabled={
                                      product.status !== "Delivered" ||
                                      !product.order_received ||
                                      Boolean(
                                        reviews.find(
                                          (el) =>
                                            el.order_id == order.order_id &&
                                            el.product.id == product.id &&
                                            el.customer.id == customer.id &&
                                            el.shop.id == product.shop.id
                                        )
                                      )
                                    }
                                  >
                                    Write a Review
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
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

export default MyOrders;
