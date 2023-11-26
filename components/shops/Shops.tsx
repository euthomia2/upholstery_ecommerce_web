import { Shop } from "@/models/Shop";
import { Voucher } from "@/models/Voucher";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const projects = [
  {
    name: "Graph API",
    initials: "GA",
    href: "#",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Templates",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type ShopsProps = {
  shops: Shop[];
};

const Shops: React.FC<ShopsProps> = ({ shops }) => {
  const router = useRouter();
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Shops
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            This is the page for all the active shops.
          </p>
        </div>

        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {shops.map((shop) => (
            <li
              key={shop.id}
              className="col-span-1 flex rounded-md shadow-sm bg-white hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/shops/${shop.name}`)}
            >
              <div className="flex w-16 bg-gray-500 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                <BuildingStorefrontIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200">
                <div className="flex-1 px-4 py-2 text-sm">
                  <p className="font-bold text-gray-900 hover:text-gray-600">
                    {shop.name}
                  </p>
                  <p className="text-gray-500 line-clamp-2">
                    {shop.description}
                  </p>
                </div>
                {/* <div className='flex-shrink-0 pr-2'>
                  <button
                    type='button'
                    className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    <span className='sr-only'>Copy Voucher Code</span>
                    <DocumentDuplicateIcon
                      className='h-6 w-6'
                      aria-hidden='true'
                    />
                  </button>
                </div> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shops;
