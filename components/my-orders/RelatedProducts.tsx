"use client";

import Link from "next/link";
import { addProduct } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const RelatedProducts = ({ product }) => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartProducts = products.find((el) => el.name === product.name);

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
            className={`h-full w-full object-cover object-center group-hover:opacity-75`}
          />
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">{product.category?.title}</p>
          <h3 className="mt-1 font-semibold text-gray-900 truncate whitespace-nowrap">
            <Link
              href={`/products/${convertToSlug(
                product.category.title
              )}/${convertToSlug(product.name)}`}
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
    </li>
  );
};

export default RelatedProducts;
