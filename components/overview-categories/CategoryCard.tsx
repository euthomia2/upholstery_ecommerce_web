import Link from "next/link";
import Image from "next/image";

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

const CategoryCard = ({ category }) => {
  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div className="flex-shrink-0">
        <Image
          height={40}
          width={40}
          className="rounded-full"
          src="/assets/product-placeholder.png"
          alt="Category Tab"
        />
      </div>
      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${convertToSlug(category.title)}`}
          className="focus:outline-none"
        >
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{category.title}</p>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
