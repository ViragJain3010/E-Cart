import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  SelectCartItems,
  SelectCartLoadingStatus,
  deleteItemFromCartAsync,
  updateCartAsync,
} from "./CartSlice";
import emptyCart from "../../Images/cart.png";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { HashLoader } from "react-spinners";

const Cart = () => {
  const [openModal, setOpenModal] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(SelectCartItems);
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

  const handleRemove = (e, itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  const handleQty = (e, item, newQty) => {
    e.preventDefault();
    if (newQty > 0) {
      dispatch(updateCartAsync({ ...item, quantity: +newQty }));
    }
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex self-center h-lvh w-full align-middle justify-center bg-white">
          <HashLoader size={75} color="#4f46e5" className="self-center" />
        </div>
      ) : (
        <>
          {cartItems.length > 0 && (
            <div className="flex flex-col bg-white shadow-xl lg:mx-64 md:mx-8 my-16 lg:px-8 md:px-4 rounded-lg">
              <div className="flex-1 px-4 py-6 sm:px-6">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                    Your Cart
                  </h1>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between  text-xl font-medium text-gray-700">
                                <h3>
                                  <Link to={`/products/${item.product.id}`}>
                                    {item.product.title}
                                  </Link>
                                  <p className="mt-1 text-sm text-start text-gray-500">
                                    {item.product.brand}
                                  </p>
                                </h3>
                                <div className="ml-4">
                                  <p className="flex flex-col text-gray-500 text-base">
                                    $
                                    {Math.round(
                                      item.product.price *
                                        (1 -
                                          item.product.discountPercentage / 100)
                                    )}{" "}
                                    x {item.quantity}
                                  </p>
                                  <p className="flex flex-col">
                                    $
                                    {Math.round(
                                      item.product.price *
                                        (1 -
                                          item.product.discountPercentage /
                                            100) *
                                        item.quantity
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="inline">
                                Qty :
                                <div className="text-white inline px-3 align-middle">
                                  <button
                                    onClick={(e) =>
                                      handleQty(e, item, item.quantity - 1)
                                    }
                                    className="inline-grid text-center font-normal px-2 w-6 rounded-md bg-indigo-500 text-xl justify-center hover:bg-indigo-600"
                                  >
                                    -
                                  </button>
                                  <div className="inline-grid text-center font-medium px-2 py-1 text-gray-600 text-lg">
                                    {item.quantity}
                                  </div>

                                  <button
                                    onClick={(e) =>
                                      handleQty(e, item, item.quantity + 1)
                                    }
                                    className="inline-grid text-center font-normal px-2 w-6  rounded-md bg-indigo-500 text-xl justify-center hover:bg-indigo-600"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="flex">
                                <Modal
                                  type="danger"
                                  title={`Delete ${item.product.title}`}
                                  message="Are you sure you want to delete this item from your cart?"
                                  primaryOption="Delete"
                                  secondaryOption="Cancel"
                                  primaryAction={(e) =>
                                    handleRemove(e, item.id)
                                  }
                                  secondaryAction={() => setOpenModal(null)}
                                  showModal={openModal === item.id}
                                ></Modal>
                                <button
                                  onClick={(e) => {
                                    setOpenModal(item.id);
                                  }}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal :</p>
                  <p>${Subtotal}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                  <p>Total Items :</p>
                  <p>{TotalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
          {cartItems.length <= 0 && (
            <div className="flex flex-col lg:mx-6 md:mx-8 my-4 py-16 lg:px-8 md:px-4 rounded-lg bg-white">
              <div className="h-auto w-auto flex flex-col self-center justify-center align-middle">
                {" "}
                <img className="w-4/5 md:w-auto self-center" src={emptyCart} />
                <p className="text-3xl p-6">Uh Oh! Your Cart is Empty!!</p>
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
