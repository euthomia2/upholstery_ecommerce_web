import { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  useAddQuantityMutation,
  useCreateProductMutation,
} from "@/services/crud-product";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";

const SellerInventoryAdd = ({ products, seller, categories, shops }) => {
  const [addQuantity, { isLoading }] = useAddQuantityMutation();
  const router = useRouter();
  const initialValues = {
    product_id: "",
    name: "",
    quantity: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(100).required("Product Name is required"),
        quantity: Yup.number().required("Quantity is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        addQuantity(values)
          .unwrap()
          .then((payload) => {
            router.push("/seller/inventory-management");
            toast.success("Added Stocks Successfully!");
          })
          .catch((error) => setErrors({ name: error.data?.message }));
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
        dirty,
        isValid,
      }) => (
        <div className="xl:pl-72 bg-white h-full">
          <main>
            <header className="flex bg-gray-100 items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                My Products
              </h1>
            </header>
            <form noValidate onSubmit={handleSubmit}>
              <div className="space-y-12 sm:space-y-16 p-8 ">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Add Stocks
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    You can add stocks to your product that you want in this
                    section.
                  </p>

                  <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Product Name
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <select
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={(e) => {
                              const selectedProduct = products?.find(
                                (el) => el.name === e.target.value
                              );

                              setFieldValue("product_id", selectedProduct.id);
                              setFieldValue("name", e.target.value);
                            }}
                            onBlur={handleBlur}
                            placeholder="Select Product"
                            className={`${
                              touched.name && errors.name
                                ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                : " ring-gray-300 focus:ring-indigo-600"
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          >
                            <option value="" hidden>
                              Select Product
                            </option>

                            {products?.map((product) => (
                              <option value={product.name}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {touched.name && errors.name && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Quantity
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              touched.quantity && errors.quantity
                                ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                : " ring-gray-300 focus:ring-indigo-600"
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                        {touched.quantity && errors.quantity && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 flex items-center justify-end gap-x-6">
                <Link
                  href="/seller/my-products"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200"
                  disabled={isSubmitting || !dirty || !isValid || isLoading}
                >
                  {isSubmitting || isLoading ? "Loading..." : "Save"}
                </button>
              </div>
            </form>
          </main>
        </div>
      )}
    </Formik>
  );
};

export default SellerInventoryAdd;
