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
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);
  const fileInputRef6 = useRef(null);
  const fileInputRef7 = useRef(null);
  const fileInputRef8 = useRef(null);
  const fileInputRef9 = useRef(null);
  const videoInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("/assets/empty_product.jpg");
  const [imageFileName, setImageFileName] = useState("");
  const [imagePreview2, setImagePreview2] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName2, setImageFileName2] = useState("");
  const [imagePreview3, setImagePreview3] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName3, setImageFileName3] = useState("");
  const [imagePreview4, setImagePreview4] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName4, setImageFileName4] = useState("");
  const [imagePreview5, setImagePreview5] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName5, setImageFileName5] = useState("");
  const [imagePreview6, setImagePreview6] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName6, setImageFileName6] = useState("");
  const [imagePreview7, setImagePreview7] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName7, setImageFileName7] = useState("");
  const [imagePreview8, setImagePreview8] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName8, setImageFileName8] = useState("");
  const [imagePreview9, setImagePreview9] = useState(
    "/assets/empty_product.jpg"
  );
  const [imageFileName9, setImageFileName9] = useState("");
  const [videoPreview, setVideoPreview] = useState("/assets/empty_product.jpg");
  const [videoFileName, setVideoFileName] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    category_id: "",
    shop_id: shops.find((el) => el.is_active).id ?? shops[0].id,
    image_file: "",
    image_file_2: "",
    image_file_3: "",
    image_file_4: "",
    image_file_5: "",
    image_file_6: "",
    image_file_7: "",
    image_file_8: "",
    image_file_9: "",
    video_file: "",
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
        video_file: Yup.string().notRequired(),
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
                        <div className="flex rounded-md shadow-sm sm:max-w-md text-gray-900">
                          <p>
                            {
                              shops?.find((shop) => shop.id === values.shop_id)
                                .name
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        <p>Product Image (At least 500x500 pixels)</p>
                        <span className="text-gray-400">
                          (You can upload up to 9 images)
                        </span>
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
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
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold"
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
                            name="image_file"
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

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48 mb-auto"
                              alt="Product Image"
                              src={imagePreview2}
                            />

                            {imageFileName2 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName2}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef2.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef2}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview2(fileReader.result);
                                  setFieldValue(
                                    "image_file_2",
                                    e.target.files[0]
                                  );
                                  setImageFileName2(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview3}
                            />

                            {imageFileName3 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName3}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file_2}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef3.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef3}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview3(fileReader.result);
                                  setFieldValue(
                                    "image_file_3",
                                    e.target.files[0]
                                  );
                                  setImageFileName3(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview4}
                            />

                            {imageFileName4 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName4}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file_3}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef4.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef4}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview4(fileReader.result);
                                  setFieldValue(
                                    "image_file_4",
                                    e.target.files[0]
                                  );
                                  setImageFileName4(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview5}
                            />

                            {imageFileName5 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName5}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file_4}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef5.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef5}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview5(fileReader.result);
                                  setFieldValue(
                                    "image_file_5",
                                    e.target.files[0]
                                  );
                                  setImageFileName5(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview6}
                            />

                            {imageFileName6 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName6}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file_5}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef6.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef6}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview6(fileReader.result);
                                  setFieldValue(
                                    "image_file_6",
                                    e.target.files[0]
                                  );
                                  setImageFileName6(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview7}
                            />

                            {imageFileName7 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName7}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file_6}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef7.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef7}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview7(fileReader.result);
                                  setFieldValue(
                                    "image_file_7",
                                    e.target.files[0]
                                  );
                                  setImageFileName7(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview8}
                            />

                            {imageFileName8 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName8}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file_7}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef8.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef8}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview8(fileReader.result);
                                  setFieldValue(
                                    "image_file_8",
                                    e.target.files[0]
                                  );
                                  setImageFileName8(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs">
                          <div className="flex flex-col mb-auto text-center items-center justify-center gap-2 my-4">
                            <img
                              className="h-48 w-48"
                              alt="Product Image"
                              src={imagePreview9}
                            />

                            {imageFileName9 && (
                              <p className="text-blue-500">
                                File Name: {imageFileName9}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!values.image_file_8}
                            className="flex mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold disabled:bg-indigo-300"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              fileInputRef9.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Image
                          </button>

                          <input
                            ref={fileInputRef9}
                            name="image_file"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setImagePreview9(fileReader.result);
                                  setFieldValue(
                                    "image_file_9",
                                    e.target.files[0]
                                  );
                                  setImageFileName9(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Product Video (Optional)
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex flex-col rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <div className="flex flex-col text-center items-center justify-center gap-2 my-4">
                            <video
                              src={videoPreview}
                              width="750"
                              height="500"
                              controls
                            />

                            {videoFileName && (
                              <p className="text-blue-500">
                                File Name: {videoFileName}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold"
                            onClick={() => {
                              // Trigger the click event on the file input when the button is clicked
                              videoInputRef.current.click();
                            }}
                          >
                            <CloudArrowUpIcon
                              className="h-6 w-6 mr-2 shrink-0"
                              aria-hidden="true"
                            />
                            Upload Product Video (Optional)
                          </button>

                          <input
                            ref={videoInputRef}
                            name="video_file"
                            accept="video/*"
                            id="contained-button-video"
                            type="file"
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setVideoPreview(fileReader.result);
                                  setFieldValue(
                                    "video_file",
                                    e.target.files[0]
                                  );
                                  setVideoFileName(e.target.files[0].name);
                                }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </div>
                        {touched.video_file && errors.video_file && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.video_file}
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

export default SellerProductsAdd;
