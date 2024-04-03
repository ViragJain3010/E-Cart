import { useDispatch, useSelector } from "react-redux";
import { SelectOrders, fetchAllOrdersByUserIdAsync } from "../Order/OrderSlice";
import { useEffect } from "react";
import { SelectLoggedInUser } from "../../Auth/AuthSlice";
import { Link } from "react-router-dom";
import cashIcon from "../../Images/cash.png";
import cardIcon from "../../Images/card.png";
import { HashLoader } from "react-spinners";
import { SelectUserLoadingStatus } from "./UserSlice";

function convertToTitleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(SelectLoggedInUser);
  const orders = useSelector(SelectOrders);
  const status = useSelector(SelectUserLoadingStatus);

  useEffect(() => {
    dispatch(fetchAllOrdersByUserIdAsync(user));
  }, [dispatch, user]);

  return (
    <>
      {status === "loading" ? (
        <div className="flex self-center h-lvh w-full align-middle justify-center bg-white">
          <HashLoader size={75} color="#4f46e5" className="self-center" />
        </div>
      ) : (
        <>
          {orders.map((order, index) => (
            <div
              key={index}
              className="py-14 my-6 rounded-2xl px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto bg-white"
            >
              <div className="flex justify-start item-start space-y-2 flex-col text-left px-6">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-indigo-600">
                  Order Number #{order.id}
                </h1>
                <p className="text-base font-medium leading-6 text-cyan-700">
                  Status: {order.status}
                </p>
              </div>
              <div className="mt-4 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-2 md:space-y-3 xl:space-y-4">
                  {/* Product List */}
                  {order.products.map((product, index) => (
                    <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full border-b-2">
                      <p className="text-2xl font-medium">Item {index + 1} :</p>
                      <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                        <Link
                          to={`/products/${product.productID}`}
                          className="pb-4 lg:w-3/12 w-2/5 self-center"
                        >
                          <img
                            className="w-full md:block self-center"
                            src={product.thumbnail}
                            alt={product.title}
                          />
                        </Link>
                        <div className="border-b pb-2 border-gray-200 flex flex-row md:grid md:grid-cols-2 justify-between  w-full ">
                          <div className="w-full flex flex-col justify-start items-start space-y-10 md:col-start-1">
                            <div className="flex flex-col">
                              <Link
                                to={`/products/${product.productID}`}
                                className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800 text-left"
                              >
                                {product.title}
                              </Link>
                              <div className="flex justify-start items-start flex-col">
                                {product.brand}
                              </div>
                            </div>
                            <p className="text-base xl:text-lg leading-6 text-gray-800 mt-8 ">
                              Qty : {product.quantity}
                            </p>
                          </div>
                          <div className=" flex flex-col md:col-start-2 items-end justify-between">
                            <p className="flex flex-col text-base text-gray-500 xl:text-lg leading-6">
                              Discounted Price : ${product.discountedprice}{" "}
                            </p>
                            <p className="flex flex-col text-base xl:text-lg font-semibold leading-6 text-gray-800">
                              Subtotal: $
                              {product.discountedprice * product.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    {/* Order Summary Section */}
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full space-y-6">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Order Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col pb-4">
                        <div className="flex justify-between  w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            ${order.subtotal}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Total Items
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            {order.totalItems} items
                          </p>
                        </div>
                        <div className="flex justify-between w-full">
                          <p className="text-base leading-4 text-gray-800 self-center">
                            Payment Method
                          </p>
                          <div className="text-sm leading-5 text-gray-600 flex">
                            <img
                              className="w-12"
                              src={
                                order.paymentMethod === "card"
                                  ? cardIcon
                                  : cashIcon
                              }
                            ></img>
                            <p
                              className={`self-center mx-1 ${
                                order.paymentMethod === "cash"
                                  ? "text-green-600"
                                  : "text-black"
                              }`}
                            >
                              {convertToTitleCase(order.paymentMethod)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Line between the two sections */}
                    <div className="md:min-h-full border-e">
                      <div className="border-t"></div>
                    </div>

                    {/* Delivery Details Section */}
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full   space-y-6   ">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Delivery Details
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col pb-4">
                        <div className="flex justify-between  w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Delivering to
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            {order.selectedAddress.fullName}
                          </p>
                        </div>

                        <div className="flex justify-between w-full">
                          <p className="text-base leading-4 text-gray-800 text-left">
                            Shipping address
                          </p>
                          <p className="text-sm leading-5 text-gray-600">
                            <span className="flex justify-end text-right">
                              {order.selectedAddress.street},
                            </span>
                            <span className="flex justify-end text-right">
                              {order.selectedAddress.city},
                            </span>
                            <span className="flex justify-end text-right">
                              {order.selectedAddress.state}
                            </span>
                            <span className="flex justify-end text-right">
                              {order.selectedAddress.pincode}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default UserOrders;
