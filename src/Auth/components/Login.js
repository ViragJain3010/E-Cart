import { Link, Navigate } from "react-router-dom";
import { ArrowLongLeftIcon as LeftOutline } from "@heroicons/react/24/outline";
import logo from "../../Images/Logo.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectError,
  SelectLoggedInUser,
  checkUserAsync,
} from "../AuthSlice";

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
          className="relative inline-flex items-center justify-center p-2 px-3 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-500 rounded-xl shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
            <LeftOutline className="w-6 h-6" />
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-indigo-700 transition-all duration-300 transform group-hover:translate-x-full ease">
            Home
          </span>
          <span className="relative invisible">Home</span>
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
                checkUserAsync({ email: data.email, password: data.password, address:[] })
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
    </>
  );
};

export default Login;
