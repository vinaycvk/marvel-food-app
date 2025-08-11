import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

type Restaurant = {
  _id: string;
  name: string;
  country: string;
  image: string; // Optional: for future image support
};

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/menu/${restaurant._id}`}>
      <div className="max-w-sm mx-auto">
        <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <div className="relative h-48 w-full">
            <Image
              src={restaurant.image}
              alt={`${restaurant.name} - Exterior`}
              className="object-cover w-full h-full"
              width={400}
              height={200}
            />
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 truncate" title="La Bella Italia"> {restaurant.name} </h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6z"></path>
              </svg>
              <span>{restaurant.country}</span>
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-green-600 font-medium">Open</span>
              <button className="px-3 py-1 rounded-full text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                View
              </button>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}
