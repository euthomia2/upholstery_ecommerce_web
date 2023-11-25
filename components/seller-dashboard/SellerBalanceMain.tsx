import { useState } from "react";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { useWithdrawSellerBalanceMutation } from "@/services/crud-seller-balance";
import { useCreateSellerWithdrawalMutation } from "@/services/crud-seller-withdrawal";
import toast from "react-hot-toast";

const SellerBalanceMain = ({
  seller,
  sellerBalances,
  totalPendingAmount,
  totalBalanceAmount,
  hasBankAccount,
}) => {
  const router = useRouter();
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [createSellerWithdrawal, { isLoading }] =
    useCreateSellerWithdrawalMutation();

  const runCloseModal = () => {
    setShowUnverifiedModal(false);
  };

  const runCloseWithdrawalModal = () => {
    setShowWithdrawalModal(false);
  };

  const runAccountDetails = () => {
    router.push("/seller/bank-accounts");
  };

  const runWithdrawalBalance = () => {
    const onePercent = totalBalanceAmount * 0.01;

    const values = {
      amount: totalBalanceAmount,
      commission_fee: Math.round(onePercent),
      total_withdrawal: totalBalanceAmount - Math.round(onePercent),
      seller_id: seller.id,
    };

    createSellerWithdrawal(values)
      .unwrap()
      .then((payload) => {
        router.push("/seller/my-balance");

        toast.success("Seller Balance Withdraw Successfully.");
      })
      .catch((error) => {
        console.log(error.data?.message);
      });
  };

  return (
    <>
      <Modal
        title={`Oops... It look's like you don't have a bank account yet.`}
        description={`You need to add a bank account first to start withdrawing your balance.`}
        status="failed"
        open={showUnverifiedModal}
        leftBtnTitle="Back"
        rightBtnTitle="Add a Bank Account"
        closeModal={runCloseModal}
        leftBtnFunc={runCloseModal}
        rightBtnFunc={runAccountDetails}
      />

      <Modal
        title={`Are you sure you want to withdraw your entire balance.`}
        description={`This will initiate the withdrawal of your entire balance.`}
        status="success"
        open={showWithdrawalModal}
        leftBtnTitle="Back"
        rightBtnTitle="Continue"
        closeModal={runCloseWithdrawalModal}
        leftBtnFunc={runCloseWithdrawalModal}
        rightBtnFunc={runWithdrawalBalance}
      />

      <div className="xl:pl-72 bg-gray-100">
        <main>
          <header className="flex items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div className="flex items-center text-base  leading-7 text-gray-900">
              <span>
                <HomeIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="ml-2 text-gray-400">Home</span>

              <span>
                <ChevronRightIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="text-gray-400">Transactions</span>

              <span>
                <ChevronRightIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="font-semibold">My Balance</span>
            </div>
          </header>

          {/* Balance List */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Balance
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the balances in your seller centre account.
                  </p>
                </div>
              </div>
              <div className="sm:flex sm:items-center justify-center mt-8">
                <div className="text-left">
                  <h1 className="text-4xl font-bold leading-6 text-gray-900 px-12">
                    Seller Balance
                  </h1>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-md text-gray-700">
                      Total: ₱
                      {totalBalanceAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-md text-gray-700">
                      Pending: ₱
                      {totalPendingAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (!hasBankAccount) {
                        setShowUnverifiedModal(true);
                      } else {
                        setShowWithdrawalModal(true);
                      }
                    }}
                    className="mt-2 bg-blue-600 px-3 py-2 text-md w-full disabled:bg-blue-200"
                    disabled={!totalBalanceAmount}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 flow-root bg-white overflow-hidden">
              <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Seller Balance ID
                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerBalances.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell"
                        >
                          No Balance Found...
                        </td>
                      </tr>
                    )}

                    {sellerBalances?.map((balance) => {
                      const createdDate = new Date(balance.created_at);
                      const createdAt = format(createdDate, "yyyy-MM-dd");

                      return (
                        <tr key={balance.seller_balance_id}>
                          <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                            {balance.seller_balance_id}
                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {balance.order_id}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {balance.product.name}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            ₱
                            {balance.amount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                            {balance.status === "Pending" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-gray-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {balance.status}
                              </span>
                            )}

                            {balance.status === "Cancelled" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-red-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {balance.status}
                              </span>
                            )}

                            {balance.status === "Pending Withdrawal" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-orange-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {balance.status}
                              </span>
                            )}

                            {balance.status === "Completed" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-indigo-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {balance.status}
                              </span>
                            )}

                            {balance.status === "Processed Withdrawal" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-green-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {balance.status}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {createdAt}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SellerBalanceMain;
