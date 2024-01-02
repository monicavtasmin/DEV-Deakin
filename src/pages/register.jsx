import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app, db } from "../firebaseconfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Register() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

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
      if (
        inputData.name &&
        inputData.email &&
        inputData.password &&
        inputData.confirmPassword &&
        inputData.password === inputData.confirmPassword
      ) {
        const response = await createUserWithEmailAndPassword(
          auth,
          inputData.email,
          inputData.password
        );
        let userId = response.user.uid;
        await setDoc(doc(db, "users", userId), {
          name: inputData.name,
          email: inputData.email,
        });
        setInputData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        toast("Account has been created");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (inputData.password !== inputData.confirmPassword) {
        toast("Password and confirm password don't match");
      } else {
        toast("Please input valid data");
      }
    } catch (error) {
      toast("Authentication Error");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full py-12">
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
      {/* Register Box  */}
      <div className="w-[90%] lg:w-[40%] drop-shadow-lg rounded-md bg-white flex flex-col space-y-6 p-5 rounded-md">
        <div className="text-center text-[1.5rem] text-primary font-semibold">
          Register
        </div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col space-y-5">
            <label>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              value={inputData.name}
              id="name"
              onChange={(e) => inputHandler(e)}
              className="outline-none p-2 border"
              placeholder="Input your name"
            />
          </div>
          <div className="flex flex-col space-y-5">
            <label>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              value={inputData.email}
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
              value={inputData.password}
              id="password"
              onChange={(e) => inputHandler(e)}
              className="outline-none p-2 border"
              placeholder="Input your password"
              type="password"
            />
          </div>
          <div className="flex flex-col space-y-5">
            <label>
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              value={inputData.confirmPassword}
              id="confirmPassword"
              onChange={(e) => inputHandler(e)}
              className="outline-none p-2 border"
              placeholder="Input your confirm password"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-semibold p-3 rounded-md hover:brightness-110"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="text-center">
          Already have an account ?{" "}
          <a href="/login" className="text-primary">
            Login Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
