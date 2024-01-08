/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
    ],
  }
  ```
*/

import React from "react";
import { StarIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Review } from "@/models/Review";
import { format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type CustomerReviewsProps = {
  reviews: Review[];
};

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  return (
    <div className="bg-white">
      <div>
        <h1 className="pb-8 text-xl font-bold tracking-tight text-gray-900">
          Customer Reviews ({reviews.length})
        </h1>
        <h2 className="sr-only">Customer Reviews ({reviews.length})</h2>

        <div className="-my-10">
          {reviews.length === 0 && (
            <div className="py-8 my-8 bg-gray-100">
              <p className="text-center w-full text-gray-900 font-semibold">
                No Reviews Found..
              </p>
            </div>
          )}

          {reviews.map((review, reviewIdx) => {
            const createdDate = new Date(review.created_at);
            const createdAt = format(createdDate, "MMMM dd, yyyy");

            return (
              <div
                key={review.id}
                className="flex space-x-4 text-sm text-gray-500"
              >
                <div className="flex-none py-10">
                  <UserCircleIcon
                    className="text-gray-300 h-10 w-10 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={classNames(
                    reviewIdx === 0 ? "" : "border-t border-gray-200",
                    "flex-1 py-10"
                  )}
                >
                  <h3 className="font-medium text-gray-900">
                    {review.customer.first_name} {review.customer.last_name}
                  </h3>
                  <p>
                    <time dateTime={createdAt}>{createdAt}</time>
                  </p>

                  <div className="mt-4 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.ratings > rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{review.ratings} out of 5 stars</p>

                  <div
                    className="prose prose-sm mt-4 max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: review.comments }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
