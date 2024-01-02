import React from "react";
import { Link } from "react-router-dom";
import Facebook from "../../assets/facebook.svg";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribeHandler = async (e) => {
    setLoading(true);
    try {
      if (email !== "") {
        await axios.post(`${process.env.REACT_APP_ROUTE}/send_mail`, {
          email,
        });
        toast("Message Sent");
        setEmail("");
      } else {
        toast("Please input your email");
      }
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
        progressStyle={{ background: "#D61C4E" }}
      />
      <footer className="w-full p-5 md:p-12 flex flex-col bg-black justify-center text-white">
        <div className="flex items-center flex-col space-y-5">
          <div className="text-[1.5rem] uppercase text-center">
            sign up for our daily insider
          </div>
          <div className="flex items-center text-black w-full justify-center">
            <input
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Input your email"
              className="p-2 h-[3rem] w-full md:w-[50%] outline-none border-none"
            />
            <button
              onClick={() => subscribeHandler()}
              className="bg-primary p-2 px-5 h-[3rem] text-white"
            >
              {loading ? "Loading..." : "Subscribe"}
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full mt-12 flex-col space-y-5 md:space-y-0 md:flex-row">
          <div className="flex flex-col space-y-5">
            <div className="text-[1.25rem]">Explore</div>
            <Link to="/">Home</Link>
            <Link to="/">Questions</Link>
            <Link to="/">Articles</Link>
            <Link to="/">Tutorials</Link>
          </div>
          <div className="flex flex-col space-y-5">
            <div className="text-[1.25rem]">Support</div>
            <Link to="/">FAQs</Link>
            <Link to="/">Help</Link>
            <Link to="/">Contact Us</Link>
          </div>
          <div className="flex flex-col space-y-5 items-center">
            <div className="text-[1.25rem]">Stay Connected</div>
            <div className="flex items-center space-x-5">
              <img className="h-[2rem] w-auto" src={Facebook} alt="" />
              <img className="h-[2rem] w-auto" src={Twitter} alt="" />
              <img className="h-[2rem] w-auto" src={Instagram} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
