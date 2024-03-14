import { Link } from "react-router-dom";
import { ArrowLongLeftIcon as LeftOutline } from "@heroicons/react/24/outline";
import logo from "../../Images/Y-removebg-preview.png";
import { useForm } from "react-hook-form";
import PasswordStrength from "./PasswordStrength";
import zxcvbn from "zxcvbn";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectLoggedInUser, createUserAsync } from "../AuthSlice";

const SignUp = () => {
  const [passwordStrength, setPasswordStrength] = useState({
    text: "Very Weak",
    color: "gray-400",
    score: 0,
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const dispath = useDispatch();
  const user = useSelector(SelectLoggedInUser);

  return (
    <>
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
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispath(
                createUserAsync({ email: data.email, password: data.password })
              );
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
                    onChange: (e) => {
                      const result = zxcvbn(e.target.value);
                      // console.log(result);
                      const varText =
                        result.score === 4
                          ? "Strong"
                          : result.score === 3
                          ? "Good"
                          : result.score === 2
                          ? "Fair"
                          : result.score === 1
                          ? "Weak"
                          : "Very Weak";
                      // console.log(text);

                      const varColor =
                        result.score === 4
                          ? "green-700"
                          : result.score === 3
                          ? "lime-500"
                          : result.score === 2
                          ? "yellow-400"
                          : result.score === 1
                          ? "red-400"
                          : "gray-400";

                      setPasswordStrength({
                        text: varText,
                        color: varColor,
                        score: result.score,
                      });
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <PasswordStrength passwordStrength={passwordStrength} />
              {errors.password && (
                <p className="animate-pulse text-right text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* <-- Confirm Password --> */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Required",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords not Matching",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.confirmPassword && (
                <p className="animate-pulse text-right text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* <-- Sign Up Button --> */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
