"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  CategoriesStateType,
  Category,
  closeCategories,
  SectionItem,
} from "@/slices/categoriesSlice";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/services/crud-category";
import Cookies from "js-cookie";
import {
  useCustomerLogoutMutation,
  useSellerGetUserQuery,
} from "@/services/authentication";
import NProgress from "nprogress";
import LoadingText from "../LoadingText";
import { useRouter } from "next/navigation";

const CategoriesModal = () => {
  const { data: user, isError } = useSellerGetUserQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { open, navigation } = useSelector(
    (state: CategoriesStateType) => state.categories
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout] = useCustomerLogoutMutation();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogOut = useCallback(async () => {
    const log = await logout()
      .unwrap()
      .then(() => {
        Cookies.remove("is_authenticated");
        localStorage.removeItem("user-id");
        router.push("/customer/login");
      })
      .catch((error) => console.log(error));

    return log;
  }, [router, logout]);

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

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get("is_authenticated");

    if (isAuthenticatedCookie !== null && isAuthenticatedCookie !== undefined) {
      if (user?.user.user_type === 1) {
        router.push("/seller/dashboard");
      } else {
        setIsAuthenticated(true);
      }
    }

    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user]);

  return (
    <>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={() => dispatch(closeCategories())}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => dispatch(closeCategories())}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200"></div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category: Category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {categoriesData?.map((item) => {
                                console.log(item);
                                return (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={`/products/${convertToSlug(
                                        item.title
                                      )}`}
                                      className="-m-2 block p-2 text-gray-500"
                                    >
                                      {item.title}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page: SectionItem) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                {isLoading ? (
                  <LoadingText />
                ) : isAuthenticated && !isLoading ? (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Link
                        href="/account-details"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Account Details
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/update-password"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Update Password
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/my-orders"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        My Orders
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/my-return-refunds"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Return / Refunds
                      </Link>
                    </div>
                    <div className="flow-root">
                      <button
                        type="button"
                        onClick={handleLogOut}
                        className="-m-2 block p-2 font-medium text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Link
                        href="/buyer/login"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="flow-root">
                      <a
                        href="#"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </a>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CategoriesModal;
