"use client";

import { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { openCategories } from "@/slices/categoriesSlice";
import AuthenticatedNavItem from "./AuthenticatedNavItem";
import VisitorNavItem from "./VisitorNavItem";
import Link from "next/link";
import Logo from "../Logo";
import LoadingText from "../LoadingText";
import NProgress from "nprogress";
import { openCart } from "@/slices/cartSlice";
import "nprogress/nprogress.css";
import { useSellerGetUserQuery } from "@/services/authentication";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/services/crud-category";

const Navbar = () => {
  const { data: user, isError } = useSellerGetUserQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { navigation } = useSelector((state) => state.categories);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
    <nav
      aria-label="Top"
      className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <button
            type="button"
            className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
            onClick={() => dispatch(openCategories())}
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Logo */}
          <div className="ml-4 flex lg:ml-0">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Flyout menus */}
          <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="flex">
                  {({ open }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            open
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-700 hover:text-gray-800",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus:outline-none"
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute inset-x-0 top-full left-48 max-w-xs bg-white text-sm text-gray-500">
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            className="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />
                          {/* Fake border when menu is open */}
                          <div
                            className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                            aria-hidden="true"
                          >
                            <div
                              className={classNames(
                                open ? "bg-gray-200" : "bg-transparent",
                                "h-px w-full transition-colors duration-200 ease-out"
                              )}
                            />
                          </div>

                          <div className="relative">
                            <div className="mx-auto max-w-7xl">
                              <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-4">
                                <div className="row-start-1 grid grid-cols-1 gap-x-8 gap-y-10 text-sm">
                                  <div>
                                    <ul
                                      role="list"
                                      aria-labelledby={`categories-heading`}
                                      className="py-6 sm:py-4"
                                    >
                                      {categoriesData?.map((item) => (
                                        <li key={item.title} className="flex">
                                          <a
                                            href={`/products/${convertToSlug(
                                              item.title
                                            )}`}
                                            className="hover:text-gray-800 hover:bg-gray-100 w-full py-3 sm:py-2 px-8"
                                          >
                                            {item.title}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ))}

              {isAuthenticated && !isLoading
                ? navigation.pages
                    .filter(
                      (el) =>
                        el.name == "Products" || el.name == "Discount Vouchers"
                    )
                    .map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))
                : navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
            </div>
          </Popover.Group>

          <div className="ml-auto flex items-center">
            {isLoading ? (
              <LoadingText />
            ) : isAuthenticated && !isLoading ? (
              <AuthenticatedNavItem />
            ) : (
              <VisitorNavItem />
            )}

            {/* {!isLoading ? (
              <div className='flex lg:ml-6'>
                <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
                  <span className='sr-only'>Search</span>
                  <MagnifyingGlassIcon className='h-6 w-6' aria-hidden='true' />
                </a>
              </div>
            ) : null} */}

            {!isLoading ? (
              <div className="ml-4 flow-root lg:ml-6">
                <button
                  onClick={() => dispatch(openCart())}
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {totalQuantity}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
