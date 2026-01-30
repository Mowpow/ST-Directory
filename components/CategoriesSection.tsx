"use client";

import Link from "next/link";

interface Category {
  name: string;
  count: number;
  slug: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <div className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Semi Trailer Types Available at Dealerships
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/?category=${category.slug}`}
              className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors border border-gray-200 hover:border-blue-300"
            >
              <div className="font-semibold text-gray-900 mb-1">{category.name}</div>
              <div className="text-sm text-gray-600">{category.count} dealers</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
