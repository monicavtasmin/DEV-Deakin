import React from "react";
import { useState } from "react";
import Article from "../components/article";
import Layout from "../components/layout/layout";
import Question from "../components/question";

function Post() {
  const [activeTab, setActiveTab] = useState("question");

  return (
    <Layout>
      <div className="w-full h-full p-5 flex flex-col space-y-5">
        <div className="text-[1.5rem]">Select Post Type :</div>
        <div className="flex bg-secondary w-fit rounded-md overflow-hidden">
          <div
            className={`${
              activeTab === "question" ? " bg-primary text-white" : ""
            } p-3 text-center cursor-pointer w-[10rem]`}
            onClick={() => setActiveTab("question")}
          >
            Question
          </div>
          <div
            className={`${
              activeTab === "article" ? " bg-primary text-white" : ""
            } p-3 text-center cursor-pointer w-[10rem]`}
            onClick={() => setActiveTab("article")}
          >
            Article
          </div>
        </div>
        {activeTab === "question" && <Question />}
        {activeTab === "article" && <Article />}
      </div>
    </Layout>
  );
}

export default Post;
