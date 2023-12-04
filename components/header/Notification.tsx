"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Fragment, useCallback } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import {
  useCustomerGetUserQuery,
  useCustomerLogoutMutation,
} from "@/services/authentication";
import { useRouter } from "next/navigation";
import LoadingText from "../LoadingText";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearCart } from "@/slices/cartSlice";
import {
  useCreateNotificationMutation,
  useGetNotificationByCustomerIdQuery,
} from "@/services/crud-notification";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Notification = () => {
  const { data: user } = useCustomerGetUserQuery();
  const router = useRouter();
  const { data: notifications, isLoading: notifcationsLoading } =
    useGetNotificationByCustomerIdQuery(user?.id);
  const dispatch = useDispatch();

  return (
    <Menu
      as="div"
      className="relative inline-block text-left ml-2 -mr-6 lg:-mr-2 lg:ml-4"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md py-3 text-sm font-semibold text-gray-900 px-2">
          <BellIcon
            className="h-6 w-6 flex-shrink-0 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute py-2 overflow-y-auto max-h-96 right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 pt-2">
            <p className="truncate text-xl font-bold text-gray-900">
              Notifications
            </p>
          </div>
          {notifications?.length === 0 && (
            <div className="px-4 py-3">
              <p className="truncate text-sm font-medium text-gray-900">
                You have no notifications right now...
              </p>
            </div>
          )}
          {notifications?.map((notification) => {
            const ago = formatDistanceToNow(new Date(notification.created_at));

            return (
              <div className="px-4 py-3 ">
                <p className="text-sm font-bold text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm mt-1 text-gray-900">
                  {notification.description}
                </p>
                <p className="text-sm mt-1 text-blue-700">{ago} ago</p>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Notification;
