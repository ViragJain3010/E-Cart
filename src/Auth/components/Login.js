import { Link, Navigate } from "react-router-dom";
import { ArrowLongLeftIcon as LeftOutline } from "@heroicons/react/24/outline";
import logo from "../../Images/Y-removebg-preview.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectError,
  SelectLoggedInUser,
  checkUserAsync,
  createUserAsync,
} from "../AuthSlice";
import { useEffect, useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const dispath = useDispatch();
  const error = useSelector(SelectError);
  const user = useSelector(SelectLoggedInUser);

  return (
    <>
      {user && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="absolute left-6 top-4 invisible sm:visible">
        <Link
          to="/"
          class="relative inline-flex items-center justify-center p-2 px-3 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-500 rounded-xl shadow-md group"
        >
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
            <LeftOutline className="w-6 h-6" />
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-indigo-700 transition-all duration-300 transform group-hover:translate-x-full ease">
            Home
          </span>
          <span class="relative invisible">Home</span>
        </Link>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto sm:h-24 sm:w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              dispath(
                checkUserAsync({ email: data.email, password: data.password })
              );
              // console.log(error)
            })}
          >
            {/* <-- Email --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-start text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i,
                      message: "Email address is not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <p className="animate-pulse text-right text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* <-- Password --> */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Required",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* <-- Shows required or other form filling related errors --> */}
              {errors.password && (
                <p className="animate-pulse text-right text-red-400">
                  {errors.password.message}
                </p>
              )}

              {/* <-- Shows login/password error --> */}
              {error && (
                <p className="animate-pulse text-right text-red-400">
                  {error.message}
                </p>
              )}
            </div>

            {/* <-- Sign Up Button --> */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
      {/* {error && (
        <div id="alert" className="w-3/6 m-auto">
          {" "}
          <div
            class="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 "
            role="alert"
          >
            <svg
              class="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              <span class="font-medium">Info alert!</span> {error.message}
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Login;
