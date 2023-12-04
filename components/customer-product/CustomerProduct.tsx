import React from "react";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/slices/cartSlice";
import CustomerReviews from "../CustomerReviews";
import { Review } from "@/models/Review";
import ReactPlayer from "react-player";
import { useCustomerGetUserQuery } from "@/services/authentication";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function convertToSlug(inputString: string) {
  // Convert to lowercase and replace spaces with hyphens
  let slug = inputString.toLowerCase().replace(/\s+/g, "-");

  slug = inputString
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-\&-/g, "-");

  // Remove special characters using regular expressions
  slug = slug.replace(/[^a-z0-9-]/g, "");

  return slug;
}

type CustomerProductProps = {
  productData: Product;
  reviews: Review[];
};

const CustomerProduct: React.FC<CustomerProductProps> = ({
  productData,
  reviews,
}) => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartProducts = products.find((el) => el.name === productData.name);
  const { data: user, isFetching } = useCustomerGetUserQuery();

  return (
    <div className="bg-white">
      {/* Product video */}

      {productData?.video_file && (
        <div className="w-full bg-black">
          <ReactPlayer
            url={productData.video_file}
            playing={true}
            muted={true}
            loop={true}
            width="100%"
          />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div className="flex items-center text-sm">
                  <Link
                    href="/products"
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    Products
                  </Link>

                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center text-sm">
                  <Link
                    href={`/products/${convertToSlug(
                      productData.category.title
                    )}`}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {productData.category.title}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {productData.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                ₱
                {productData.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>

              {/* <div className='ml-4 border-l border-gray-300 pl-4'>
                <h2 className='sr-only'>Reviews</h2>
                <div className='flex items-center'>
                  <div>
                    <div className='flex items-center'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <p className='sr-only'>{reviews.average} out of 5 stars</p>
                  </div>
                  <p className='ml-2 text-sm text-gray-500'>
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div> */}
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                {productData.description}
              </p>
            </div>

            <div className="mt-6 flex items-center">
              <p className="text-sm text-gray-500">
                Quantity: {productData.quantity} item(s) left
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={productData.image_file}
              alt={productData.image_name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <div className="mt-10">
              <button
                onClick={() =>
                  dispatch(addProduct({ ...productData, user_id: user.id }))
                }
                type="button"
                className="flex w-full disabled:bg-indigo-200 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                disabled={
                  (cartProducts &&
                    productData.quantity - cartProducts.quantity === 0) ||
                  productData.quantity === 0
                }
              >
                {cartProducts &&
                productData.quantity - cartProducts.quantity === 0
                  ? `Max quantity (${productData.quantity}) reached`
                  : "Add to Cart"}
              </button>
            </div>
          </section>
        </div>
        <div className="py-20 col-span-2">
          <CustomerReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default CustomerProduct;
