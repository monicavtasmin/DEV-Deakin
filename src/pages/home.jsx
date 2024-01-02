import React from "react";
import Deakin from "../assets/deakin.jpg";
import Article from "../components/article";
import Layout from "../components/layout/layout";
import Question from "../components/question";

function Home() {
  return (
    <Layout>
      <div className="p-5 flex flex-col space-y-5">
        <div className="flex flex-col lg:flex-row lg:space-x-5">
          <img className="rounded-md" src={Deakin} alt="" />
          <div className="mt-5 lg:mt-0">
            <div className="text-[2rem] font-medium">
              Welcome to DEV@Deakin!
            </div>
            <div className="text-[1.5rem] font-light">
              Seek and research on various information that can broden our
              horizons about various things.This website will help you to find
              interesting and helpful articles, you can also discuss it with the
              other students!
            </div>
          </div>
        </div>
        <div>
          <div className="text-[2rem] font-medium text-primary">Questions</div>
          <Question />
        </div>
        <div>
          <div className="text-[2rem] font-medium text-primary mb-5">
            Articles
          </div>
          <Article />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
