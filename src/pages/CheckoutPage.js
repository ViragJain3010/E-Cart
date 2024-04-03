import React from "react";
import Checkout from "../Feature/Checkout/Checkout";
import Checkout_Cart from "../Feature/Cart/Checkout_Cart";

const CheckoutPage = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-7">
          <Checkout>
            <Checkout_Cart />
          </Checkout>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
