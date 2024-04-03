import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import img0 from "../../Images/happyDog1.png";
import img1 from "../../Images/happyDog2.png";
import img2 from "../../Images/happyDog3.png";
import img3 from "../../Images/happyDog4.png";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectCurrentOrder,
  SelectOrderLoadingStatus,
  resetCurrentOrder,
} from "./OrderSlice";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";
import { HashLoader } from "react-spinners";

const img = [img0, img1, img2, img3];

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const currentOrder = useSelector(SelectCurrentOrder);
  const status = useSelector(SelectOrderLoadingStatus);

  useEffect(() => {
    dispatch(resetCurrentOrder());
  }, [dispatch, params]);

  return (
    <>
      {status === "loading" ? (
        <div className="flex self-center h-lvh w-full align-middle justify-center bg-white">
          <HashLoader size={75} color="#4f46e5" className="self-center" />
        </div>
      ) : (
        <>
          {currentOrder && !params.id && (
            <Navigate to="/" replace={true}></Navigate>
          )}
          <main className="grid min-h-full place-items-center bg-white px-6 py-16 sm:py-32 lg:px-8">
            <div className="text-center md:flex align-middle justify-center">
              <div className=" m-auto">
                <img
                  className="self-center "
                  src={img[Math.floor(Math.random() * 4)]}
                />
              </div>

              <div className="align-middle justify-center self-center">
                <p className="text-5xl mb-4 font-semibold text-indigo-600">
                  Order Number #{params.id}{" "}
                </p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Order Placed Successfully
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  We've received your order and we're shipping it to you
                </p>
                <div className="flex justify-center">
                  <div className="flex justify-between space-x-8">
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <Link
                        to={`/orders`}
                        className="rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex"
                      >
                        My Orders
                        <ArrowLongRightIcon
                          aria-hidden="true "
                          className="w-5 flex mx-2 align-middle"
                        />
                      </Link>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <Link
                        to={"/"}
                        className="rounded-md px-3.5 py-2.5 text-sm font-semibold bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 shadow-sm hover:border-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex"
                      >
                        Home
                        <ArrowLongRightIcon
                          aria-hidden="true "
                          className="w-5 flex mx-2 align-middle"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default OrderSuccess;
