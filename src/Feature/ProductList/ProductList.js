import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductList = ({ product }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
          {product.map((product) => (
            <Link to={`/products/${product.id}`}>
              <div
                key={product.id}
                className="group relative border-2 p-2 border-gray-200 rounded-lg hover:shadow-xl hover:scale-105  transition"
              >
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
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
