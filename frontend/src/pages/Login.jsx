import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleLoginSignup = (e) => {
    e.preventDefault();
    if (currentState === "Sign Up") {
      if (name.length < 3) {
        toast.error("Name should be atleast 3 characters long");
        return;
      }
      if(!/[a-zA-Z]+/.test(name)){
        toast.error("Name should not contain numbers");
        return;
      }
    }

    if (password.length < 8){
      toast.error("Password should be atleast 8 characters long");
      return;
    }

    if (password !== confirm) {
      toast.error("Password and confirm password must match");
      return;
    }

  };
  
  return (
    <div
      className="homePageWrapper min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('../images/login-back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <form className="flex flex-col items-center w-[90%] sm:max-w-96 mt-10 px-10 py-10 gap-4 text-gray-800 bg-white rounded-lg ">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
          
        <button className="bg-black text-white font-light px-8 py-2 mt-4" onSubmit={handleLoginSignup}>
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
