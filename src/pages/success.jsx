import React from "react";

function Success() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-[80%] md:w-[50%] border drop-shadow-lg h-[50%] p-5 flex flex-col items-center space-y-5 justify-center text-[2rem]">
        <div>Payment Success !</div>
        <svg
          className="text-[4rem]"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="green"
            d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
          />
        </svg>
        <a href="/">
          <button className="bg-primary text-white rounded-md px-5 py-2 text-[1.25rem]">
            Back to Home
          </button>
        </a>
      </div>
    </div>
  );
}

export default Success;
