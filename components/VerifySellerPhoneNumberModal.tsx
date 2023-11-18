"use client";

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSendOtpMutation } from "@/services/semaphore-api";
import toast from "react-hot-toast";
import { useVerifySellerContactNumberMutation } from "@/services/crud-seller";

type VerifySellerPhoneNumberModalProps = {
  sellerId: number;
  open: boolean;
  contact_number: string;
  closeModal: () => void;
};

const VerifySellerPhoneNumberModal: React.FC<VerifyPhoneNumberModalProps> = ({
  sellerId,
  open,
  closeModal,
  contact_number,
}) => {
  const [sendOtpMessage, { isLoading: loadingOtpMessage }] =
    useSendOtpMutation();
  const [verifyContactNumber, { isLoading: loadingVerification }] =
    useVerifySellerContactNumberMutation();
  const router = useRouter();
  const [sms, setSms] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [sentCode, setSentCode] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sentCode) {
      const intervalId = setInterval(() => {
        // Decrement the timer
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [sentCode]);

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
                      Verify Phone Number
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
                      <img className="h-16" src="/assets/shield-check.png" />
                      <p className="text-sm text-gray-500 text-left">
                        Hello, please verify your phone number here to order. We
                        will send you a one time SMS code.
                      </p>
                    </div>

                    <div className="mt-2 rounded-md ring-gray-300">
                      <label
                        htmlFor="contact_number"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Contact Number
                      </label>
                      <input
                        id="contact_number"
                        type="text"
                        name="contact_number"
                        value={contact_number}
                        className={`disabled:bg-gray-300 ring-gray-300 focus:ring-indigo-600 block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        disabled
                      />
                    </div>

                    <div className="mt-2 rounded-md ring-gray-300 ">
                      <label
                        htmlFor="sms_code"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        SMS Code
                      </label>
                      <div className="flex">
                        <input
                          id="sms_code"
                          type="text"
                          name="sms_code"
                          onChange={(e) => setSmsCode(e.target.value)}
                          value={smsCode}
                          className={`${
                            error && message
                              ? " border-red-500 ring-red-500 focus:ring-red-500 focus:border-0 "
                              : " ring-gray-300 focus:ring-indigo-600"
                          } block w-full border-0 text-gray-700 rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            sendOtpMessage({
                              contact_number,
                            })
                              .unwrap()
                              .then((payload) => {
                                setSentCode(true);
                                setSms(payload.sms);
                                setMessage(
                                  "Your verification code is sent to your number via SMS."
                                );
                              })
                              .catch((error) => console.log(error));
                          }}
                          className="bg-blue-500 hover:bg-blue-600 px-3 text-sm whitespace-nowrap disabled:bg-blue-200 disabled:text-gray-900"
                          disabled={sentCode && timer > 0}
                        >
                          {sentCode && timer > 0 ? `${timer}s` : "Send Code"}
                        </button>
                      </div>
                      {!error && message && (
                        <p className="text-green-500 text-sm mt-2">{message}</p>
                      )}
                      {error && message && (
                        <p className="text-red-500 text-sm mt-2">{message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (Number(smsCode) !== Number(sms)) {
                        setError(true);
                        setMessage(
                          "The SMS code that you provided is invalid. Please try again."
                        );
                      } else {
                        setError(false);
                        setMessage("");
                        verifyContactNumber({ id: sellerId })
                          .unwrap()
                          .then((payload) => {
                            window.location.reload();

                            toast.success(
                              "Verified Phone Number Successfully. You can order now. Enjoy!"
                            );
                          })
                          .catch((error) => console.log(error));
                      }
                    }}
                    className="inline-flex text-center w-full justify-center rounded-md bg-indigo-600 text-white border border-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default VerifySellerPhoneNumberModal;
