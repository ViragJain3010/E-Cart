import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminProductList = ({ product }) => {
  console.log(product);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
          {product.map((product) => (
            <div className="flex flex-col">
              <Link
                to={`/admin/product/${product.id}`}
                key={product.id}
                className="h-full"
              >
                <div className="group h-full relative border-2 p-2 border-gray-200 rounded-lg hover:shadow-xl hover:scale-105  transition">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="m-2 flex justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-left text-gray-900 ">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </h3>
                      <div className="inline-flex mt-1 ">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                Math.floor(product.rating) > rating
                                  ? "text-yellow-400"
                                  : "text-gray-300",
                                "h-6 w-4 flex-shrink-0",
                                "mask mask-star-2 mask-half-2"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 align-center px-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-md font-medium text-gray-900 m-1">
                        $
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className="text-sm font-medium text-gray-500 line-through">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  {product && product.deleted && (
                    <div className="text-left text-red-600">
                      Product deleted
                    </div>
                  )}
                </div>
              </Link>
              <Link
                to={`/admin/editproduct/${product.id}`}
                className=" bg-indigo-600 hover:bg-indigo-800 text-white rounded-md p-2 mt-6"
              >
                Edit Product
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
