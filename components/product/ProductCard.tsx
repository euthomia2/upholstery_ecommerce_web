"use client";

import Link from "next/link";
import { addProduct } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCustomerGetUserQuery } from "@/services/authentication";

const ProductCard = ({ product }) => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartProducts = products.find((el) => el.name === product.name);
  const { data: user, isFetching } = useCustomerGetUserQuery();

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

  return (
    <li
      key={product?.id}
      className="inline-flex w-64 flex-col text-center lg:w-auto mt-8 overflow-hidden"
    >
      <div className="group relative mb-6">
        <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
          <img
            src={product.image_file}
            alt={product.name}
            className={`${
              product.quantity === 0 && "opacity-50 group-hover:opacity-50"
            } h-full w-full object-cover object-center group-hover:opacity-75`}
          />

          {product.quantity <= 0 && (
            <p className="text-white bg-gray-900/50 h-max my-auto py-3 font-normal">
              Out of Stock
            </p>
          )}

          {product.quantity <= 10 && product.quantity > 0 && (
            <p className="text-white bg-gray-900/50 h-max mt-auto py-3 font-normal">
              {product.quantity} item(s) left
            </p>
          )}
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">{product.category?.title}</p>
          <h3 className="mt-1 font-semibold text-gray-900 truncate whitespace-nowrap">
            <Link
              href={`/products/${convertToSlug(product.category.title)}/${
                product.shop.name
              }/${product.slug}`}
            >
              <span className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-gray-900">
            ₱
            {product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={() =>
            dispatch(
              addProduct({
                ...product,
                original_price: product.price,
                user_id: user?.id,
              })
            )
          }
          className="border rounded-lg border-gray-900 text-gray-900 w-full text-sm py-4 hover:bg-gray-100 duration-150 transition disabled:bg-gray-300 "
          disabled={
            (cartProducts && product.quantity - cartProducts.quantity === 0) ||
            product.quantity === 0
          }
        >
          {cartProducts && product.quantity - cartProducts.quantity === 0
            ? `Max quantity (${product.quantity}) reached`
            : "Add to Cart"}
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
