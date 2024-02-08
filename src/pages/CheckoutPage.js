import React from "react";
import Checkout from "../Feature/Checkout/Checkout";
import Checkout_Cart from "../Feature/Cart/Checkout_Cart";

const CheckoutPage = () => {
  return (
    <>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-7">
        <div className="lg:col-span-4 bg-white rounded-lg shadow-xl">
            <Checkout />
        </div>
        <div className="lg:col-span-3">
            <Checkout_Cart />
        </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
