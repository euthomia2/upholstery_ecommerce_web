import { useRouter } from "next/navigation";
import {
  useCustomerForgotPasswordMutation,
  useCustomerResetPasswordMutation,
  useSellerForgotPasswordMutation,
} from "@/services/authentication";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import VerifySellerForgotPasswordNumberModal from "../VerifySellerForgotPasswordNumberModal";

const ForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useSellerForgotPasswordMutation();
  const [seller, setSeller] = useState({});
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
  };

  const openVerifyModal = () => {
    setShowVerifyModal(true);
  };

  const closeVerifyModal = () => {
    setShowVerifyModal(false);
  };

  return (
    <>
      <VerifySellerForgotPasswordNumberModal
        title="Hello, please verify the associated phone number to reset password. We
      will send you a one-time SMS code."
        sellerId={seller?.id}
        open={showVerifyModal}
        closeModal={closeVerifyModal}
        contact_number={seller?.contact_number}
        email={seller?.user?.email}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email Address is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          forgotPassword(values)
            .unwrap()
            .then((payload) => {
              setSeller(payload.seller);
              openVerifyModal();
              setSubmitting(false);
            })
            .catch((error) => setErrors({ email: error.data?.message }));
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
          <form noValidate onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className={`${
                  touched.email && errors.email
                    ? "text-red-500"
                    : "text-gray-900"
                }  block text-sm font-medium leading-6 `}
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`${
                    touched.email && errors.email
                      ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                      : " ring-gray-300 focus:ring-indigo-600"
                  } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200"
                disabled={isSubmitting || !dirty || !isValid || isLoading}
              >
                {isSubmitting || isLoading ? "Loading..." : "Continue"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
