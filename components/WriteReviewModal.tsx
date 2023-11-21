"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSendOtpMutation } from "@/services/semaphore-api";
import { useVerifyCustomerContactNumberMutation } from "@/services/crud-customer";
import toast from "react-hot-toast";
import { useCreateReviewMutation } from "@/services/crud-review";

type WriteReviewModalProps = {
  orderId: string | null;
  productId: string | null;
  shopId: string | null;
  customerId: string | null;
  productImage: string | null;
  productName: string | null;
  productPrice: string | null;
  productShop: string | null;
  open: boolean;
  closeModal: () => void;
};

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  orderId,
  productId,
  shopId,
  customerId,
  productImage,
  productName,
  productPrice,
  productShop,
  open,
  closeModal,
}) => {
  const router = useRouter();
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [firstStar, setFirstStar] = useState("outline");
  const [secondStar, setSecondStar] = useState("outline");
  const [thirdStar, setThirdStar] = useState("outline");
  const [fourthStar, setFourthStar] = useState("outline");
  const [fifthStar, setFifthStar] = useState("outline");

  const initialValues = {
    order_id: orderId,
    shop_id: shopId,
    product_id: productId,
    customer_id: customerId,
    comments: "",
    ratings: "",
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={() => closeModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            comments: Yup.string()
              .required("Comments is required")
              .min(30, "Comments must be at least 30 characters"),
            ratings: Yup.number()
              .required("Ratings is required")
              .oneOf([1, 2, 3, 4, 5], "Ratings must be 1, 2, 3, 4, or 5"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            createReview(values)
              .unwrap()
              .then((payload) => {
                window.location.reload();

                toast.success("Review Product Successfully!");
              })
              .catch((error) => {
                setErrors({ comments: error.data?.message });
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
            setFieldTouched,
          }) => (
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                      <div>
                        <div className="flex items-center ">
                          <h1 className="text-gray-900 font-semibold text-xl">
                            Write a Review
                          </h1>
                        </div>
                        <div className="mt-3 sm:mt-5">
                          {/* <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Payment failed. The transaction has been cancelled.
                    </Dialog.Title> */}
                          <div className="mt-2 flex items-center gap-6">
                            <img
                              className="h-16"
                              src="/assets/shield-check.png"
                            />
                            <p className="text-sm text-gray-500 text-left">
                              Hello, please write a review for the product you
                              ordered from us. We value your feedback and would
                              appreciate your thoughts on the experience with
                              our product.
                            </p>
                          </div>

                          <div className="mt-6 mb-4 flex items-center gap-6">
                            <img className="h-20 w-20" src={productImage} />
                            <div className="flex flex-col">
                              <p className="text-md text-gray-900 font-bold text-left">
                                {productName}
                              </p>
                              <p className="text-md text-gray-700 font-normal text-left">
                                ₱
                                {productPrice?.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                              </p>
                              <p className="text-md text-gray-700 font-normal text-left">
                                {productShop}
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 sm:col-span-2 ">
                            <label
                              htmlFor="comments"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                            >
                              Comments
                            </label>
                            <textarea
                              id="comments"
                              name="comments"
                              rows={3}
                              value={values.comments}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${
                                touched.comments && errors.comments
                                  ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                                  : " ring-gray-300 focus:ring-indigo-600"
                              } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                              defaultValue={""}
                            />
                            {touched.comments && errors.comments && (
                              <p className="text-red-500 text-sm mt-2">
                                {errors.comments}
                              </p>
                            )}
                          </div>

                          <div className="mt-2 sm:col-span-2">
                            <label
                              htmlFor="ratings"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                            >
                              Ratings
                            </label>

                            <div className="flex gap-2">
                              {firstStar === "outline" && (
                                <OutlineStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("outline");
                                    setThirdStar("outline");
                                    setFourthStar("outline");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 1);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {firstStar === "solid" && (
                                <SolidStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("outline");
                                    setThirdStar("outline");
                                    setFourthStar("outline");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 1);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {secondStar === "outline" && (
                                <OutlineStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("solid");
                                    setThirdStar("outline");
                                    setFourthStar("outline");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 2);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {secondStar === "solid" && (
                                <SolidStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("solid");
                                    setThirdStar("outline");
                                    setFourthStar("outline");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 2);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {thirdStar === "outline" && (
                                <OutlineStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("solid");
                                    setThirdStar("solid");
                                    setFourthStar("outline");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 3);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {thirdStar === "solid" && (
                                <SolidStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("solid");
                                    setThirdStar("solid");
                                    setFourthStar("outline");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 3);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {fourthStar === "outline" && (
                                <OutlineStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("solid");
                                    setThirdStar("solid");
                                    setFourthStar("solid");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 4);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {fourthStar === "solid" && (
                                <SolidStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("solid");
                                    setThirdStar("solid");
                                    setFourthStar("solid");
                                    setFifthStar("outline");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 4);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {fifthStar === "outline" && (
                                <OutlineStarIcon
                                  onClick={() => {
                                    setFirstStar("solid");
                                    setSecondStar("solid");
                                    setThirdStar("solid");
                                    setFourthStar("solid");
                                    setFifthStar("solid");
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 5);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}

                              {fifthStar === "solid" && (
                                <SolidStarIcon
                                  onClick={() => {
                                    setFieldTouched("ratings", true);
                                    setFieldValue("ratings", 5);
                                  }}
                                  className="h-10 w-10 text-yellow-300 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}
                            </div>

                            {errors.ratings && (
                              <p className="text-red-500 text-sm mt-2">
                                {errors.ratings}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                        <button
                          type="submit"
                          onClick={() => {}}
                          className="inline-flex text-center w-full justify-center rounded-md bg-indigo-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                          disabled={
                            isSubmitting || !dirty || !isValid || isLoading
                          }
                        >
                          {isSubmitting || isLoading ? "Loading..." : "Submit"}
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
    </Transition.Root>
  );
};

export default WriteReviewModal;
