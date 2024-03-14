import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../Constants/constants";

const Pagination = ({ page, setPage, handlePage, totalItems }) => {
  const TotalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
            onClick={(e) => handlePage(page < TotalPages ? page + 1 : page)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * ITEMS_PER_PAGE, totalItems)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 transition-all ${
                  page > 1
                    ? "hover:bg-indigo-800 hover:text-gray-100 cursor-pointer"
                    : "cursor-not-allowed"
                } `}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>

              {Array.from({
                length: TotalPages,
              }).map((e, index) => (
                <div
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 transition-all${
                    index + 1 === page
                      ? " z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : " text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-300  focus:outline-offset-0"
                  }`}
                >
                  {index + 1}
                </div>
              ))}

              <div
                onClick={(e) => handlePage(page < TotalPages ? page + 1 : page)}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 transition-all ${
                  page < TotalPages
                    ? "hover:bg-indigo-800 hover:text-gray-100 cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
