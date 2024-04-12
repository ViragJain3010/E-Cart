import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function ProgressBar({ status }) {
  return (
    <>
      <div className="max-w-xl mx-auto mt-8">
        <div className="flex justify-center pb-3">
          <div className="flex align-middle p-0">
            {/* Circle 1 */}
            <div
              className={`w-8 h-8 mx-auto rounded-full text-lg text-white flex self-center ${
                status === "DELIVERED"
                  ? "bg-indigo-600"
                  : status === "DISPATCHED"
                  ? "bg-cyan-600"
                  : "bg-green-600"
              }`}
            >
              <span className="text-white text-center w-full flex">
                <CheckCircleIcon className="self-center" />
              </span>
            </div>
          </div>
          {/* Line 1 */}
          <div className="w-1/5 align-center items-center align-middle content-center flex">
            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
              <div
                className={`text-xs leading-none py-1 text-center  rounded ${
                  status === "DELIVERED"
                    ? "bg-indigo-600"
                    : status === "DISPATCHED"
                    ? "bg-cyan-400"
                    : "bg-green-400"
                }`}
                style={{
                  width:
                    status === "DELIVERED" || status === "DISPATCHED"
                      ? "100%"
                      : "40%",
                }}
              />
            </div>
          </div>
          {/* Circle 2 */}
          <div className="flex align-middle p-0">
            <div
              className={`w-8 h-8 mx-auto rounded-full text-lg text-white flex self-center ${
                status === "DELIVERED"
                  ? "bg-indigo-600"
                  : status === "DISPATCHED"
                  ? "bg-cyan-600"
                  : "border-2 border-gray-300 bg-white rounded-full"
              }`}
            >
              <span className="text-white text-center w-full flex">
                <CheckCircleIcon className="self-center" />
              </span>
            </div>
          </div>
          {/* Line 2 */}
          <div className="w-1/5 align-center items-center align-middle content-center flex">
            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
              <div
                className={`text-xs leading-none py-1 text-center  rounded ${
                  status === "DELIVERED"
                    ? "bg-indigo-600"
                    : status === "DISPATCHED"
                    ? "bg-cyan-400"
                    : "bg-green-400"
                }`}
                style={{
                  width:
                    status === "DELIVERED"
                      ? "100%"
                      : status === "SHIPPING"
                      ? "0%"
                      : "40%",
                }}
              />
            </div>
          </div>
          {/* CIRCLE 3 */}
          <div className="flex p-0">
            <div className={`w-8 h-8   mx-auto rounded-full text-lg text-white flex items-center ${status==="DELIVERED"?"bg-indigo-600":"bg-white border-2 border-gray-200"}`}>
              <span className="text-gray-darker text-center w-full">
              <CheckCircleIcon className="self-center" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex content-center text-center justify-evenly">
          <div className="mx">Shipping</div>
          <div className="mx">Dispatched</div>
          <div className="mx">Delivered</div>
        </div>
      </div>
    </>
  );
}
