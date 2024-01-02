import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51Lp3FvFiIMNan2ESZjdztM8q8NtuRbM1mzqtSpeqAzYJTwzFtWrRnRIVMPmEXf5OSABxqsV76ygWgfwQ6EVHwUYP00NzgDkfBc";

function PaymentWindow({
  packageName,
  paymentModal,
  setPaymentModal,
  amount,
  productId,
}) {
  console.log(productId);
  let stripePromise;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(PUBLIC_KEY);
    }

    return stripePromise;
  };

  const item = {
    price: productId,
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "subscription",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/plan`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log(error);
  };

  return (
    <div
      className={`flex fixed w-full h-screen top-0 left-0 items-center justify-center ${
        paymentModal ? "opacity-1 visible" : "opacity-0 invisible"
      } transition-all`}
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="w-[90%] md:w-[40%] bg-white rounded-md p-12 relative">
        <svg
          onClick={() => setPaymentModal(false)}
          className="absolute right-[1%] top-[3%] text-[2rem] cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
          />
        </svg>
        <div className="text-[1.25rem] text-center">{packageName} Package</div>
        <div className="text-center text-[1.5rem] font-medium">
          ${amount}/Mo
        </div>
        <button
          className="w-full bg-primary text-white mt-5 p-3 rounded-md"
          onClick={() => redirectToCheckout()}
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
}

export default PaymentWindow;
