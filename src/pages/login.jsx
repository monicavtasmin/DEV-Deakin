import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const inputHandler = (e) => {
    setInputData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (inputData.email && inputData.password) {
        const response = await signInWithEmailAndPassword(
          auth,
          inputData.email,
          inputData.password
        );
        toast("Login Success");
        localStorage.setItem("deakintoken", response.user.accessToken);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast("Please input valid data");
      }
    } catch (error) {
      toast("Email or password is invalid");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        progressStyle={{ background: "#2795a9" }}
      />
      {/* Login Box  */}
      <div className="w-[90%] lg:w-[40%] drop-shadow-lg rounded-md bg-white flex flex-col space-y-6 p-5 rounded-md">
        <div className="text-center text-[1.5rem] text-primary font-semibold">
          Login
        </div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col space-y-5">
            <label>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              onChange={(e) => inputHandler(e)}
              className="outline-none p-2 border"
              placeholder="Input your email"
              type="email"
            />
          </div>
          <div className="flex flex-col space-y-5">
            <label>
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              onChange={(e) => inputHandler(e)}
              className="outline-none p-2 border"
              placeholder="Input your password"
              type="password"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <input type="checkbox" />
              <div>Remember Me</div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-semibold p-3 rounded-md hover:brightness-110"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="text-center">
          Don't have an account ?{" "}
          <a href="/register" className="text-primary">
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
