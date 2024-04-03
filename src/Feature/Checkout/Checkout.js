import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SelectLoggedInUser } from "../../Auth/AuthSlice";
import { useState } from "react";
import Checkout_Cart from "../Cart/Checkout_Cart";
import cardGIF from "../../Images/credit-card.gif";
import cashGIF from "../../Images/wallet.gif";
import {
  SelectLoggedInUserInfo,
  updateLoggedInUserDataAsync,
} from "../Users/UserSlice";

export default function Checkout() {
  const user = useSelector(SelectLoggedInUser);
  const userData = useSelector(SelectLoggedInUserInfo);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(userData.address[0]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleAddress = (e) => {
    setSelectedAddress(userData.address[e.target.value]);
  };

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="lg:col-span-4 bg-white rounded-lg shadow-xl">
        <form
          className=" p-4 m-4 text-left"
          noValidate
          onSubmit={handleSubmit((data) => {
            dispatch(
              updateLoggedInUserDataAsync({
                id: user.id,
                address: [...userData.address, data],
              })
            );
            reset();
          })}
        >
          {/* Form Fields */}
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("fullName", {
                        required: "This field is required",
                      })}
                      id="fullName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      id="phone"
                      inputMode="numeric"
                      {...register("phone", {
                        required: "This field is required",
                      })}
                      autoComplete="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                </div>
                <div className="col-span-full">
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", {
                          required: "This field is required",
                        })}
                        id="street"
                        autoComplete="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("city", {
                        required: "This field is required",
                      })}
                      id="city"
                      autoComplete="city"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("state", {
                        required: "This field is required",
                      })}
                      id="state"
                      autoComplete="state"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      {...register("pincode", {
                        required: "This field is required",
                      })}
                      id="pincode"
                      autoComplete="pincode"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset and Submit Button */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={(e) => reset()}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>
          </div>
        </form>

        {/* Address and payment Method */}
        <div className="border-b border-gray-900/10 pb-12 text-left px-10">
          {/* List of all addresses */}
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Address
          </h2>
          <p>Choose from existing addresses</p>
          <div className="flex items-center gap-x-3">
            <ul className="w-full">
              {userData.address.map((address, index) => (
                <li key={index}>
                  <label
                    htmlFor={index}
                    className="flex justify-between gap-x-6 py-5 px-6 border-2 border-gray-300 m-2 rounded-lg"
                  >
                    <input
                      id={index}
                      onChange={(e) => handleAddress(e)}
                      value={index}
                      name="address"
                      type="radio"
                      checked={address === selectedAddress}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-800">
                        {address.fullName}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        {address.city} , {address.state}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        {address.pincode}
                      </p>
                    </div>
                    <p className="block text-sm font-medium leading-6 text-gray-600">
                      Contact: {address.phone}
                    </p>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Mode of Payment
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose your Mode of Payment{" "}
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    onChange={(e) => {
                      handlePaymentMethod(e);
                    }}
                    name="cash"
                    type="radio"
                    value={"cash"}
                    checked={paymentMethod === "cash"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="cash"
                    className="flex text-sm font-medium leading-6 text-gray-900 "
                  >
                    <span className="flex self-center">Cash on Delivery</span>
                    <img
                      src={cashGIF}
                      className="w-1/6 px-4 invisible md:visible"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    onChange={(e) => {
                      handlePaymentMethod(e);
                    }}
                    name="card"
                    type="radio"
                    value={"card"}
                    checked={paymentMethod === "card"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="card"
                    className="flex text-sm font-medium leading-6 text-gray-900 "
                  >
                    <span className="flex self-center">Credit/Debit Card </span>
                    <img
                      src={cardGIF}
                      className="w-1/6 px-4 invisible md:visible"
                    />
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <Checkout_Cart
        selectedAddress={selectedAddress}
        paymentMethod={paymentMethod}
      />
    </>
  );
}
