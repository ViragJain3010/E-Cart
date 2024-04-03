import { useDispatch, useSelector } from "react-redux";
import {
  SelectCartItems,
  SelectCartLoadingStatus,
  resetCartAsync,
} from "./CartSlice";
import { addOrderAsync, SelectCurrentOrder } from "../Order/OrderSlice";
import { SelectLoggedInUser } from "../../Auth/AuthSlice";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Checkout_Cart = ({ paymentMethod, selectedAddress }) => {
  const cartItems = useSelector(SelectCartItems);
  const user = useSelector(SelectLoggedInUser);
  const dispatch = useDispatch();
  const currentOrder = useSelector(SelectCurrentOrder);
  const status = useSelector(SelectCartLoadingStatus);

  var Subtotal = cartItems.reduce(
    (amount, item) =>
      Math.round(
        item.product.price * (1 - item.product.discountPercentage / 100)
      ) *
        item.quantity +
      amount,
    0
  );

  var TotalItems = cartItems.reduce(
    (amount, item) => item.quantity + amount,
    0
  );

  const items = cartItems.map((item) => {
    return {
      productID: item.product.id,
      quantity: item.quantity,
      thumbnail: item.product.thumbnail,
      title: item.product.title,
      brand: item.product.brand,
      discountedprice: `${Math.round(
        item.product.price * (1 - item.product.discountPercentage / 100)
      )}`,
    };
  });

  const handleOrder = (e) => {
    const order = {
      products: items,
      subtotal: Subtotal,
      totalItems: TotalItems,
      user: user.id,
      paymentMethod,
      selectedAddress: selectedAddress,
      status: "SHIPPING",
    };
    dispatch(addOrderAsync(order));
    dispatch(resetCartAsync(user.id));
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex self-center h-lvh w-full align-middle justify-center bg-white">
          <HashLoader size={75} color="#4f46e5" className="self-center" />
        </div>
      ) : (
        <>
          {currentOrder && (
            <Navigate
              to={`/ordersuccess/${currentOrder.id}`}
              replace={true}
            ></Navigate>
          )}
          <div className="lg:col-span-3">
            <div className="flex flex-col bg-white shadow-xl px-2 rounded-lg">
              <div className="flex-1 px-4 py-6 sm:px-6">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-semibold  text-gray-900">
                    Your Cart
                  </h1>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-700">
                                <h3>
                                  <p to={"/products/" + item.product.href}>
                                    {item.product.title}
                                  </p>
                                </h3>
                                <p className="ml-4">
                                  $
                                  {Math.round(
                                    item.product.price *
                                      (1 -
                                        item.product.discountPercentage / 100) *
                                      item.quantity
                                  )}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-left text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="inline">
                                Qty :
                                <div className="text-white inline px-3">
                                  <div className="inline-grid text-center font-medium px-2 py-1 text-gray-600 text-lg">
                                    {item.quantity}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div></div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 px-3">
                  <p>Subtotal :</p>
                  <p>${Subtotal}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 px-3 my-2">
                  <p>Total Items :</p>
                  <p>{TotalItems} Items</p>
                </div>
              </div>
              <div className="mb-10 ">
                <button
                  onClick={handleOrder}
                  className="border-2 text-white p-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Checkout_Cart;
