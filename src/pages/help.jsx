import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import deakinAvatar from "../assets/deakinAvatar.svg";
import user from "../assets/user.png";
import Layout from "../components/layout/layout";

function Help() {
  const theme = {
    background: "white",
    headerBgColor: "#2795a9",
    headerFontColor: "white",
    headerFontSize: "15px",
    botBubbleColor: "#2795a9",
    botFontColor: "#fff",
    userBubbleColor: "#D3D3D3",
    userFontColor: "black",
  };
  return (
    <Layout>
      <div className="p-12 flex justify-center">
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={[
              {
                id: "Welcome",
                message: "Welcome to DEV@Deakin Help Bot ",
                trigger: "question",
              },
              {
                id: "question",
                message: "We are here to help you ",
                trigger: "botask",
              },
              {
                id: "botask",
                message: "Which post do you need help with?",
                trigger: "help",
              },
              {
                id: "help",
                options: [
                  { value: 1, label: "Question", trigger: "Question" },
                  { value: 2, label: "Article", trigger: "Article" },
                ],
              },
              {
                id: "Article",
                message: "What do you wish to know about",
                trigger: "articlehelp",
              },

              {
                id: "articlehelp",
                options: [
                  {
                    value: 1,
                    label: "What kind of article can I post?",
                    trigger: "firstarticle",
                  },
                  {
                    value: 2,
                    label: "Can I get feedback on my articles?",
                    trigger: "secondarticle",
                  },
                  {
                    value: 3,
                    label: "What if I want people to notice my articles? ",
                    trigger: "thirdarticle",
                  },
                ],
              },
              {
                id: "firstarticle",
                component: <div> Ofcourse IT related articles.</div>,
                trigger: "askagain",
              },
              {
                id: "secondarticle",
                component: (
                  <div>
                    {" "}
                    Indeed. We have comment section under your posting.{" "}
                  </div>
                ),
                trigger: "askagain",
              },
              {
                id: "thirdarticle",
                component: (
                  <div>
                    {" "}
                    Other user will get notified if you post a new article{" "}
                  </div>
                ),
                trigger: "askagain",
              },

              {
                id: "Question",
                message:
                  "You have query regarding to the Question. Please enter your query",
                trigger: "questionhelp",
              },
              {
                id: "questionhelp",
                options: [
                  {
                    value: 1,
                    label: "Will people get notified if I post a question?",
                    trigger: "first",
                  },
                  {
                    value: 2,
                    label:
                      "What if I change my mind about the post I have made",
                    trigger: "second",
                  },
                  {
                    value: 3,
                    label: "Can I ask random question? ",
                    trigger: "third",
                  },
                ],
              },
              {
                id: "first",
                component: (
                  <div>
                    {" "}
                    Yes. Other user will get notified if you post a new
                    question.
                  </div>
                ),
                trigger: "askagain",
              },
              {
                id: "second",
                component: (
                  <div>
                    {" "}
                    You can always delete the post and it will be permanently
                    deleted. Don't worry about it{" "}
                  </div>
                ),
                trigger: "askagain",
              },
              {
                id: "third",
                component: (
                  <div> No. IT and job related questions only please. </div>
                ),
                trigger: "askagain",
              },
              {
                id: "askagain",
                message: "What else do you wish to know about?",
                trigger: "help",
              },
            ]}
            botAvatar={deakinAvatar}
            userAvatar={user}
          />
        </ThemeProvider>
      </div>
    </Layout>
  );
}

export default Help;
