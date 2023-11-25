import { Customer } from "@/models/Customer";
import { Order } from "@/models/Order";
import Link from "next/link";
import RelatedProducts from "./RelatedProducts";
import { Product } from "@/models/Product";

type AfterOrderScreenProps = {
  customer: Customer;
  order: Order;
  products: Product[];
};

const AfterOrderScreen: React.FC<AfterOrderScreenProps> = ({
  customer,
  order,
  products,
}) => {
  const getProductCategory = JSON.parse(order.products);

  // Extract categories and remove duplicates using Set
  const uniqueCategories = Array.from(
    new Set(
      getProductCategory.map((product) => ({
        category: product.category.title,
        productName: product.name, // Replace 'name' with the actual property that holds the product name
      }))
    )
  );

  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src="/assets/delivery-1.jpg"
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Order successful
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Thanks for ordering
              </p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Order ID</dt>
                <dd className="mt-2 text-indigo-600">{order.order_id}</dd>
              </dl>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
              >
                {JSON.parse(order.products).map((product) => (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <img
                      src={product.image_file}
                      alt={product.name}
                      className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                        <p>{product.name}</p>
                      </h3>
                      <p>{product.category.title}</p>
                      <p>{product.quantity} item(s)</p>
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      ₱
                      {product.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">
                    ₱
                    {order.subtotal_price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </dd>
                </div>

                {order.price_discount && order.discount_mode === "Price" && (
                  <div className="flex justify-between">
                    <dt>Price Discount</dt>
                    <dd className="text-red-500">
                      -₱
                      {order.price_discount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </dd>
                  </div>
                )}

                {order.price_discount &&
                  order.discount_mode === "Percentage" && (
                    <div className="flex justify-between">
                      <dt>Price Discount</dt>
                      <dd className="text-red-500">
                        -₱
                        {Math.round(
                          (order.price_discount / 100) * order.subtotal_price
                        ).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </dd>
                    </div>
                  )}

                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">
                    ₱
                    {order.shipping_fee.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </dd>
                </div>

                {order.shipping_discount && order.discount_mode === "Price" && (
                  <div className="flex justify-between">
                    <dt>Shipping Discount</dt>
                    <dd className="text-red-500">
                      -₱
                      {order.shipping_discount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </dd>
                  </div>
                )}

                {order.shipping_discount &&
                  order.discount_mode === "Percentage" && (
                    <div className="flex justify-between">
                      <dt>Shipping Discount</dt>
                      <dd className="text-red-500">
                        -₱
                        {Math.round(
                          (order.shipping_discount / 100) * order.shipping_fee
                        ).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </dd>
                    </div>
                  )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">
                    ₱
                    {order.total_price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </dd>
                </div>
              </dl>

              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping Address
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">
                        {order.customer.street_address},{" "}
                        {order.customer.barangay}
                      </span>
                      <span className="block">
                        {order.customer.city}, {order.customer.province},{" "}
                        {order.customer.zip_code}
                      </span>
                      <span className="block">Philippines</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Payment Method</dt>
                  <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                    <div className="flex-auto">
                      <p className="text-gray-900">{order.payment_method}</p>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  href="/my-orders"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Back to My Orders
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>

              <div className="relative w-full overflow-x-auto my-4">
                <p className="mt-2 font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Related Products
                </p>
                <ul
                  role="list"
                  className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0"
                >
                  {products
                    .filter((product) => {
                      // Check if there's any unique category matching the product's category and productName
                      return uniqueCategories.find(
                        (uniqueCategory) =>
                          uniqueCategory.category === product.category.title &&
                          uniqueCategory.productName !== product.name
                      );
                    })
                    .map((product, index) => {
                      if (index < 6) {
                        return (
                          <RelatedProducts key={product.id} product={product} />
                        );
                      } else {
                        return null;
                      }
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AfterOrderScreen;
