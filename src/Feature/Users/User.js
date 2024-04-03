import React, { useState } from "react";
import avatar from "../../Images/isolated-happy-smiling-dog-white-background-portrait-2.jpg";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { SelectLoggedInUser } from "../../Auth/AuthSlice";
import {
  SelectLoggedInUserInfo,
  SelectUserLoadingStatus,
  updateLoggedInUserDataAsync,
} from "./UserSlice";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";

function convertToTitleCase(address) {
  return address.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(SelectLoggedInUserInfo);
  const status = useSelector(SelectUserLoadingStatus);
  const [EditIndex, SetEditIndex] = useState(-1);
  const [CreateForm, ShowCreateForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRemove = (e, index) => {
    const newData = { ...userData, address: [...userData.address] }; // creates a shallow copy
    newData.address.splice(index, 1); // updates the shallow copy according to newData
    dispatch(updateLoggedInUserDataAsync(newData)); // passing the shallow copy to replace the original data with updated data
  };

  const handleEdit = (addressUpdate, index) => {
    const newData = { ...userData, address: [...userData.address] }; // for shallow copy issue
    newData.address.splice(index, 1, addressUpdate);
    dispatch(updateLoggedInUserDataAsync(newData));
    SetEditIndex(-1);
  };

  const handleEditForm = (index) => {
    SetEditIndex(index);
    const add = userData.address[index];
    setValue("fullName", add.fullName);
    setValue("street", add.street);
    setValue("city", add.city);
    setValue("state", add.state);
    setValue("pincode", add.pincode);
    setValue("phone", add.phone);
  };

  const handleAdd = (address) => {
    const newData = {
      ...userData,
      address: [...userData.address, address],
    };
    console.log(newData);
    dispatch(updateLoggedInUserDataAsync(newData));
    ShowCreateForm(false);
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex self-center h-lvh w-full align-middle justify-center bg-white">
          <HashLoader size={75} color="#4f46e5" className="self-center" />
        </div>
      ) : (
        <>
          <div className="lg:grid lg:grid-cols-3 bg-white rounded lg:px-8 md:px-6 py-14">
            {/* Image Section */}
            <div className="flex lg:flex-col px-auto grid-start-1 space-y-6 justify-center lg:justify-normal">
              <div className="flex flex-col md:flex-row justify-center align-middle md:space-x-6 space-y-4  py-6">
                <img
                  src={avatar}
                  className="object-cover w-24 h-24 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 self-center"
                />
                <div className="flex flex-col justify-center align-middle">
                  <div className="text-xl font-medium text-gray-900">
                    {userData.name || "New User"}
                  </div>
                  <div className="text-base text-gray-700">
                    {userData.email}
                  </div>
                </div>
              </div>
            </div>

            {/* General Information section */}
            <div className="flex flex-col col-span-2 lg:border-l-2 lg:px-8 ">
              <div className="flex text-2xl text-indigo-800 font-medium justify-center p-4 my-2 lg:my-8 w-full">
                <h1 className="text-3xl md:text-4xl font-semibold leading-7 lg:leading-9  text-indigo-600">
                  Shipping Addresses
                </h1>
              </div>

              {/* Add address button */}
              {CreateForm === false && (
                <div onClick={() => ShowCreateForm(true)} className="self-end">
                  <button className="flex rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                    {/* <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span> */}
                    <PlusIcon className="h-6 w-6 mr-2" />
                    <span className="relative">Add New Address</span>
                  </button>
                </div>
              )}

              {/* Form and cancel Button */}
              {CreateForm === true && (
                <>
                  <div
                    onClick={() => ShowCreateForm(false)}
                    className="self-end"
                  >
                    <button className="flex rounded px-5 py-2.5 overflow-hidden group bg-red-500 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300">
                      {/* <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span> */}
                      <XMarkIcon className="h-6 w-6 mr-2" />
                      <span className="relative">Cancel</span>
                    </button>
                  </div>
                  <form
                    className=" p-4 m-4 text-left"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      handleAdd(data);
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
                </>
              )}

              {userData.address.map((address, index) => (
                <>
                  <div
                    key={index}
                    className="flex flex-col md:flex-row align-middle items-center md:p-4 px-12 my-4 border-b mx-8 lg:mx-0"
                  >
                    <div className="flex justify-between gap-x-6 py-5 px-8 border-2 border-gray-300 m-2 rounded-lg md:w-2/3 w-full">
                      <div className="min-w-0 flex-auto text-left">
                        <p className="text-sm font-semibold leading-6 text-gray-800">
                          {convertToTitleCase(address.fullName)}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {convertToTitleCase(address.street)}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {convertToTitleCase(address.city)}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {convertToTitleCase(address.state)}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {convertToTitleCase(address.pincode)}
                        </p>
                      </div>

                      <p className="block text-sm font-medium leading-6 text-gray-600 text-right">
                        Contact: {address.phone}
                      </p>
                    </div>
                    <div className="flex rounded justify-center align-middle space-x-3 my-2 md:w-1/3">
                      <div
                        onClick={(e) => {
                          handleEditForm(index);
                        }}
                        className="flex bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white rounded-md px-4 py-2 h-min self-center"
                      >
                        <PencilSquareIcon className="w-6 mr-1.5" />
                        <p className="flex">Edit</p>
                      </div>
                      <div
                        onClick={(e) => {
                          handleRemove(e, index);
                        }}
                        className="flex bg-red-600 hover:cursor-pointer hover:bg-red-700 text-white rounded-md px-4 py-2 h-min self-center"
                      >
                        <TrashIcon className="w-6 mr-1.5" />
                        <p className="flex">Delete</p>
                      </div>
                    </div>
                  </div>
                  {EditIndex === index ? (
                    <form
                      className=" p-4 m-4 text-left"
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        // console.log(data);
                        handleEdit(data, index);
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
                            onClick={(e) => SetEditIndex(-1)}
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : null}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
