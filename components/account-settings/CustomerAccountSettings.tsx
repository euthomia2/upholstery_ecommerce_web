import React, { useState, useEffect } from "react";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  cities,
  regionByCode,
  barangays,
  provinceByName,
} from "select-philippines-address";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Customer } from "@/models/Customer";
import { useCustomerUpdateUserMutation } from "@/services/authentication";
import VerifyPhoneNumberModal from "../VerifyPhoneNumberModal";

type CustomerAccountSettingsProps = {
  customer: Customer;
};

const CustomerAccountSettings: React.FC<CustomerAccountSettingsProps> = ({
  customer,
}) => {
  const [updateCustomer, { isLoading }] = useCustomerUpdateUserMutation();
  const [regionData, setRegionData] = useState();
  const [provinceData, setProvinceData] = useState();
  const [cityData, setCityData] = useState();
  const [barangaysData, setBarangaysData] = useState();

  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    regionByCode("04").then((region) => setRegionData(region.region_name));
    provinceByName("Laguna").then((province) => setProvinceData(province));
    cities("0434").then((city) =>
      setCityData(city.find((el) => el.city_name === "Cabuyao City"))
    );
    barangays("043404").then((barangays) => setBarangaysData(barangays));
  }, []);

  const initialValues = {
    first_name: customer.first_name,
    middle_name: customer.middle_name,
    last_name: customer.last_name,
    email: customer.user.email,
    contact_number: customer.contact_number,
    gender: customer.gender,
    birth_date: customer.birth_date,
    region: customer.region,
    province: customer.province,
    city: customer.city,
    barangay: customer.barangay,
    zip_code: customer.zip_code,
    street_address: customer.street_address,
  };
  let today = new Date().toISOString().split("T")[0];

  function findChangedProperties(oldObj, newObj, id: number | undefined) {
    const changedProperties = {};

    // Iterate through the keys of newObj
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        // Check if the key exists in oldObj and the values are different
        if (oldObj[key] !== newObj[key]) {
          changedProperties[key] = newObj[key];
        }
      }
    }

    changedProperties.id = id;

    return changedProperties;
  }

  function closeModal() {
    setOpenVerifyModal(false);
  }

  return (
    <>
      <VerifyPhoneNumberModal
        open={openVerifyModal}
        closeModal={closeModal}
        contact_number={customer.contact_number}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required("First Name is required"),
          middle_name: Yup.string().notRequired(),
          last_name: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email Address is required"),
          contact_number: Yup.string()
            .matches(/^(09\d{9})?$/, "Invalid Contact Number")
            .required("Contact Number is required"),
          gender: Yup.string()
            .oneOf(["Male", "Female"], "Invalid gender")
            .required("Gender is required"),
          birth_date: Yup.date()
            .required("Birth Date is required")
            .max(new Date(), "Birth Date cannot be in the future"),
          region: Yup.string().required("Region is required"),
          province: Yup.string().required("Province is required"),
          city: Yup.string().required("City is required"),
          barangay: Yup.string().required("Barangay is required"),
          zip_code: Yup.string().required("Zip Code is required"),
          street_address: Yup.string().required("Street Address is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            customer?.id,
            customer?.user.id
          );

          updateCustomer(updatedValues)
            .unwrap()
            .then((payload) => {
              router.push("/");

              toast.success("Edited Information Successfully!");
            })
            .catch((error) => setErrors({ first_name: error.data?.message }));
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
          <div className=" bg-white mx-auto max-w-7xl  lg:pb-24">
            <main>
              <form noValidate onSubmit={handleSubmit}>
                <div className="space-y-12 sm:space-y-16 p-8 ">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      Account Settings
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                      You can change the information of your account in this
                      page.
                    </p>

                    <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="first_name"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          First Name
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="first_name"
                              type="text"
                              name="first_name"
                              value={values.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.first_name && errors.first_name
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                          </div>
                          {touched.first_name && errors.first_name && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.first_name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="middle_name"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Middle Name
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="middle_name"
                              type="text"
                              name="middle_name"
                              value={values.middle_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.middle_name && errors.middle_name
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                          </div>
                          {touched.middle_name && errors.middle_name && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.middle_name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="last_name"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Last Name
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="last_name"
                              type="text"
                              name="last_name"
                              value={values.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.last_name && errors.last_name
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                          </div>
                          {touched.last_name && errors.last_name && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.last_name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Gender
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <select
                              id="gender"
                              name="gender"
                              value={values.gender}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Select Gender"
                              className={`${
                                touched.gender && errors.gender
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            >
                              <option value="" hidden>
                                Select Gender
                              </option>

                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                          {touched.gender && errors.gender && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.gender}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="birth_date"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Birth Date
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="date"
                              id="birth_date"
                              max={today}
                              name="birth_date"
                              value={values.birth_date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.birth_date && errors.birth_date
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                          </div>
                          {touched.birth_date && errors.birth_date && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.birth_date}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Email Address
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="email"
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.email && errors.email
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                          </div>
                          {touched.email && errors.email && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="contact_number"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Contact Number
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="contact_number"
                              type="text"
                              name="contact_number"
                              value={values.contact_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.contact_number && errors.contact_number
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                            {!customer.contact_number_verified_at && (
                              <button
                                type="button"
                                onClick={() => setOpenVerifyModal(true)}
                                className="bg-blue-500 hover:bg-blue-600 px-3 text-sm"
                              >
                                Verify
                              </button>
                            )}
                          </div>
                          {touched.contact_number && errors.contact_number && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.contact_number}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Region
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <select
                              id="region"
                              name="region"
                              placeholder="Select Region"
                              value={values.region}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.region && errors.region
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            >
                              <option value="" hidden>
                                Select Region
                              </option>
                              <option value={regionData}>{regionData}</option>
                            </select>
                          </div>
                          {touched.region && errors.region && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.region}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="province"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Province
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <select
                              id="province"
                              name="province"
                              placeholder="Select Province"
                              value={values.province}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.province && errors.province
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            >
                              <option value="" hidden>
                                Select Province
                              </option>
                              <option value={provinceData?.province_name}>
                                {provinceData?.province_name}
                              </option>
                            </select>
                          </div>
                          {touched.province && errors.province && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.province}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          City
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <select
                              id="city"
                              name="city"
                              placeholder="Select City"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.city && errors.city
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            >
                              <option value="" hidden>
                                Select City
                              </option>
                              <option value={cityData?.city_name}>
                                {cityData?.city_name}
                              </option>
                            </select>
                          </div>
                          {touched.city && errors.city && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.city}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="barangay"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Barangay
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <select
                              id="barangay"
                              name="barangay"
                              placeholder="Select Barangay"
                              value={values.barangay}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.barangay && errors.barangay
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            >
                              <option value="" hidden>
                                Select Barangay
                              </option>
                              {barangaysData?.map((el) => {
                                return (
                                  <option
                                    key={el.brgy_name}
                                    value={el.brgy_name}
                                  >
                                    {el.brgy_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          {touched.barangay && errors.barangay && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.barangay}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="zip_code"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Zip Code
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="zip_code"
                              type="text"
                              name="zip_code"
                              value={values.zip_code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.zip_code && errors.zip_code
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                          </div>
                          {touched.zip_code && errors.zip_code && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.zip_code}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="street_address"
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          Street Address
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="street_address"
                              type="text"
                              name="street_address"
                              value={values.street_address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.street_address && errors.street_address
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                          </div>
                          {touched.street_address && errors.street_address && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.street_address}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 flex items-center justify-end gap-x-6">
                  <Link
                    href="/"
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
    </>
  );
};

export default CustomerAccountSettings;
