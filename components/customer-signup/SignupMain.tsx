"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  cities,
  regionByCode,
  barangays,
  provinceByName,
} from "select-philippines-address";
import { useCreateCustomerMutation } from "@/services/crud-customer";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SignupMain = () => {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const [regionData, setRegionData] = useState();
  const [provinceData, setProvinceData] = useState();
  const [cityData, setCityData] = useState();
  const [barangaysData, setBarangaysData] = useState();

  const router = useRouter();

  useEffect(() => {
    regionByCode("04").then((region) => setRegionData(region.region_name));
    provinceByName("Laguna").then((province) => setProvinceData(province));
    cities("0434").then((city) =>
      setCityData(city.find((el) => el.city_name === "Cabuyao City"))
    );
    barangays("043404").then((barangays) => setBarangaysData(barangays));
  }, []);

  let today = new Date().toISOString().split("T")[0];

  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    gender: "",
    birth_date: null,
    region: "",
    province: "",
    city: "",
    barangay: "",
    zip_code: "",
    street_address: "",
    password: "",
    confirm_password: "",
  };

  return (
    <>
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
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm New Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          createCustomer(values)
            .unwrap()
            .then((payload) => {
              router.push("/customer/login");

              toast.success("Please login your newly created account!");
            })
            .catch((error) => {
              if (
                error.data?.message ===
                  "The email address that you provided is already taken." ||
                "Failed creating a user."
              ) {
                setErrors({ email: error.data?.message });
              }

              if (
                error.data?.message ===
                "The contact number that you provided is already taken."
              ) {
                setErrors({ contact_number: error.data?.message });
              }
            });
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
          <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <a href="/">
                <img
                  className="mx-auto h-20 w-auto"
                  src="/assets/transparent_logo.png"
                  alt="CCLDO Logo"
                />
              </a>
              <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
                Create a customer's account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[720px]">
              <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form className="space-y-6" noValidate onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="first_name"
                          name="first_name"
                          type="first_name"
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.first_name && errors.first_name
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />

                        {touched.first_name && errors.first_name && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.first_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="middle_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Middle Name (Optional)
                      </label>
                      <div className="mt-2">
                        <input
                          id="middle_name"
                          name="middle_name"
                          type="middle_name"
                          value={values.middle_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.middle_name && errors.middle_name
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />

                        {touched.middle_name && errors.middle_name && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.middle_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="last_name"
                          name="last_name"
                          type="last_name"
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.last_name && errors.last_name
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />

                        {touched.last_name && errors.last_name && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.last_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender
                      </label>
                      <div className="mt-2">
                        <select
                          id="gender"
                          name="gender"
                          placeholder="Select Gender"
                          value={values.gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.gender && errors.gender
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        >
                          <option value="" hidden>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {touched.gender && errors.gender && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.gender}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="birth_date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Birth Date
                      </label>
                      <div className="mt-2">
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
                        {touched.birth_date && errors.birth_date && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.birth_date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.email && errors.email
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                        {touched.email && errors.email && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact_number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="contact_number"
                          name="contact_number"
                          value={values.contact_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.contact_number && errors.contact_number
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                        {touched.contact_number && errors.contact_number && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.contact_number}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Region
                      </label>
                      <div className="mt-2">
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
                        {touched.region && errors.region && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.region}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="province"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Province
                      </label>
                      <div className="mt-2">
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
                        {touched.province && errors.province && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.province}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
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
                        {touched.city && errors.city && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="barangay"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Barangay
                      </label>
                      <div className="mt-2">
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
                              <option key={el.brgy_name} value={el.brgy_name}>
                                {el.brgy_name}
                              </option>
                            );
                          })}
                        </select>
                        {touched.barangay && errors.barangay && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.barangay}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="zip_code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Zip Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="zip_code"
                          name="zip_code"
                          value={values.zip_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.zip_code && errors.zip_code
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                      </div>
                      {touched.zip_code && errors.zip_code && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.zip_code}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="street_address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="street_address"
                          name="street_address"
                          value={values.street_address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.street_address && errors.street_address
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                      </div>
                      {touched.street_address && errors.street_address && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.street_address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.password && errors.password
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                      </div>
                      {touched.password && errors.password && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="confirm_password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          value={values.confirm_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            touched.confirm_password && errors.confirm_password
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block px-3 w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                      </div>
                      {touched.confirm_password && errors.confirm_password && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.confirm_password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200"
                      disabled={isSubmitting || !dirty || !isValid || isLoading}
                    >
                      {isSubmitting || isLoading
                        ? "Loading..."
                        : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>

              <p className="mt-10 text-center text-sm text-gray-100">
                Copyright © 2023 CCLDO, Inc.
              </p>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignupMain;
