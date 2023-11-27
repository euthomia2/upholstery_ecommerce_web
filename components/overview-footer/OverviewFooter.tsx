import Link from "next/link";

const OverviewFooter = () => {
  const footerNavigation = {
    shop: [
      { name: "Products", href: "/products" },
      { name: "Discount Vouchers", href: "/discount-vouchers" },
    ],

    account: [
      { name: "Manage Account", href: "/account-details" },
      { name: "Returns & Exchanges", href: "/my-return-refunds" },
    ],
    connect: [
      {
        name: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61553623062166 ",
      },
      { name: "Twitter", href: "https://twitter.com/RTCU" },
      {
        name: "Instagram",
        href: "https://instagram.com/rtcu14?igshid=OGQ5ZDc2ODk2ZA==",
      },
    ],
  };

  return (
    <>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid gap-8 xl:col-span-2">
            <div className="space-y-16 md:grid md:grid-cols-3 grid-start-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Shop</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.shop.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Account</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.account.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.connect.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-10">
          <p className="text-sm text-gray-500">
            Copyright &copy; 2023 CCLDO E-Commerce, Inc.
          </p>
        </div>
      </div>
    </>
  );
};

export default OverviewFooter;
