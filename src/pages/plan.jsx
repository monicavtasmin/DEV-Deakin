import React, { useState } from "react";
import Layout from "../components/layout/layout";
import PaymentWindow from "../components/paymentWindow";

function Plan() {
  const [paymentModal, setPaymentModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState({
    name: "",
    amount: 0,
  });

  const packageHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.id);
    console.log(e.target.value);
    setCurrentPackage({
      name: e.target.name,
      amount: e.target.id,
      productId: e.target.value,
    });
    setPaymentModal(true);
  };

  return (
    <Layout>
      <PaymentWindow
        packageName={currentPackage.name}
        amount={currentPackage.amount}
        productId={currentPackage.productId}
        paymentModal={paymentModal}
        setPaymentModal={setPaymentModal}
      />
      <div className="p-5 py-12">
        <div className="text-center text-[2rem] font-medium text-primary">
          Our Pricing Plan
        </div>
        <div className="text-center md:w-[50%] mx-auto mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris semper
          diam eget egestas dictum. Sed tempus velit id enim posuere fringilla.
          Nullam vestibulum tellus eget dolor commodo imperdiet.
        </div>
        <div className="flex justify-between flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 mt-12">
          {/* Card 1  */}
          <div className="flex flex-col p-5 border rounded-md w-full">
            <div className="text-[1.5rem] text-primary font-semibold">
              Basic
            </div>
            <div className="text-center font-semibold flex items-center space-x-3">
              <span className="text-[2rem]">FREE</span>
              <span className="text-gray-400 text-[1rem]"></span>
            </div>
            <div className="mt-2">
              For Most Business that want to optimize web queries
            </div>
            <div className="text-[1.25rem] mt-5">
              <div>✓ 1 User</div>
              <div>✓ 5 Comments</div>
              <div>✓ 10 Likes</div>
              <div>✓ 1 Paid Registration Type</div>
              <div>✓ 10 Email Invites</div>
            </div>
            <button
              value="price_1Lp3lQFiIMNan2ESQsO3iq8F"
              onClick={(e) => packageHandler(e)}
              id="0"
              name="Free"
              className="font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-all p-3 rounded-md mt-5 md:mt-auto"
            >
              Purchase Free
            </button>
          </div>
          {/* Card 2  */}
          <div className="flex flex-col p-5 border rounded-md w-full">
            <div className="text-[1.5rem] text-primary font-semibold">Pro</div>
            <div className="text-center font-semibold flex items-center space-x-3">
              <span className="text-[2rem]">$5</span>
              <span className="text-gray-400 text-[1rem]">/ Month</span>
            </div>
            <div className="mt-2">
              For Most Business that want to optimize web queries
            </div>
            <div className="text-[1.25rem] mt-5">
              <div>✓ 5 Users</div>
              <div>✓ 100 Comments</div>
              <div>✓ 100 Likes</div>
              <div>✓ 1 Paid Registration Type</div>
              <div>✓ 10 Email Invites</div>
              <div>✓ 10 Accounts</div>
            </div>
            <button
              value="price_1Lp3lzFiIMNan2ESom0zYiAk"
              onClick={(e) => packageHandler(e)}
              id="5"
              name="Pro"
              className="font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-all p-3 rounded-md mt-5 md:mt-auto"
            >
              Purchase Pro
            </button>
          </div>
          {/* Card 3  */}
          <div className="flex flex-col p-5 border rounded-md w-full">
            <div className="text-[1.5rem] text-primary font-semibold">
              Premium
            </div>
            <div className="text-center font-semibold flex items-center space-x-3">
              <span className="text-[2rem]">$10</span>
              <span className="text-gray-400 text-[1rem]">/ Month</span>
            </div>
            <div className="mt-2">
              For Most Business that want to optimize web queries
            </div>
            <div className="text-[1.25rem] mt-5">
              <div>✓ 10 Users</div>
              <div>✓ 500 Comments</div>
              <div>✓ 100 Likes</div>
              <div>✓ 1 Paid Registration Type</div>
              <div>✓ 10 Email Invites</div>
              <div>✓ 10 Accounts</div>
              <div>✓ Unlimited Quota</div>
            </div>
            <button
              value="price_1Lp3mKFiIMNan2ESj6qZvEMh"
              onClick={(e) => packageHandler(e)}
              id="10"
              name="Premium"
              className="font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-all p-3 rounded-md mt-5 md:mt-6"
            >
              Purchase Premium
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Plan;
