import { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useCreateProductMutation } from "@/services/crud-product";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";

const SellerProductsAdd = ({ seller, categories, shops }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("/assets/empty_product.jpg");
  const [imageFileName, setImageFileName] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    category_id: "",
    shop_id: "",
    image_file: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(100).required("Product Name is required"),
        description: Yup.string()
          .required("Description is required")
          .min(30, "Description must be at least 30 characters"),
        price: Yup.number().required("Price is required"),
        quantity: Yup.number().required("Quantity is required"),
        category_id: Yup.string().required("Category is required"),
        shop_id: Yup.string().required("Shop is required"),
        image_file: Yup.string().required("Image is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        createProduct(values)
          .unwrap()
          .then((payload) => {
            router.push("/seller/my-products");

            toast.success("Added Product Successfully!");
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
                    Add Product
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    You can add a product that you want in this section.
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
                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              touched.name && errors.name
                                ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                : " ring-gray-300 focus:ring-indigo-600"
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
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
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Description
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.description && errors.description
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          defaultValue={""}
                        />
                        {touched.description && errors.description && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Price
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            id="price"
                            type="number"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              touched.price && errors.price
                                ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                : " ring-gray-300 focus:ring-indigo-600"
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                        </div>
                        {touched.price && errors.price && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.price}
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

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="category_id"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Category
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <select
                            id="category_id"
                            name="category_id"
                            value={values.category_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Select Category"
                            className={`${
                              touched.category_id && errors.category_id
                                ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                : " ring-gray-300 focus:ring-indigo-600"
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          >
                            <option value="" hidden>
                              Select Category
                            </option>

                            {categories?.map((category) => (
                              <option value={category.id}>
                                {category.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        {touched.category_id && errors.category_id && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.category_id}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="shop_id"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Shop
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <select
                            id="shop_id"
                            name="shop_id"
                            value={values.shop_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Select Category"
                            className={`${
                              touched.shop_id && errors.shop_id
                                ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                : " ring-gray-300 focus:ring-indigo-600"
                            } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          >
                            <option value="" hidden>
                              Select Shop
                            </option>

                            {shops?.map((shop) => (
                              <option value={shop.id}>{shop.name}</option>
                            ))}
                          </select>
                        </div>
                        {touched.shop_id && errors.shop_id && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.shop_id}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Product Image
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex flex-col rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <div className="flex flex-col text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview}
                            />

                            {imageFileName && (
                              <p className="text-blue-500">
                                File Name: {imageFileName}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef}
                            name="avatar"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview(fileReader.result);
                                  setFieldValue(
                                    "image_file",
                                    e.target.files[0]
                                  );
                                  setImageFileName(e.target.files[0].name);

                                  console.log(values.image_file);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>
                        {touched.image_file && errors.image_file && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.image_file}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 flex items-center justify-end gap-x-6">
                <Link
                  href="/seller/my-shops"
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

export default SellerProductsAdd;
