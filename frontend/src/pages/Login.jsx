import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const validateName = (value) => {
    if (value.length < 3) {
      setNameError("Name should be at least 3 characters long");
    } else if (!/[a-zA-Z]+/.test(value)) {
      setNameError("Name should not contain numbers");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirm = (value) => {
    if (value !== password) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  };

  const handleLoginSignup = (e) => {
    e.preventDefault();
    if (currentState === "Sign Up") {
      validateName(name);
      validateEmail(email);
      validatePassword(password);
      validateConfirm(confirm);

      if (nameError || emailError || passwordError || confirmError) {
        toast.error("Please fix the errors before submitting");
        return;
      }
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
          <div className="w-full">
            <input
              type="text"
              className={`w-full px-3 py-2 border ${
                nameError ? "border-red-500" : "border-gray-800"
              }`}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>
        )}
        <div className="w-full">
          <input
            type="email"
            className={`w-full px-3 py-2 border ${
              emailError ? "border-red-500" : "border-gray-800"
            }`}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="w-full">
          <input
            type="password"
            className={`w-full px-3 py-2 border ${
              passwordError ? "border-red-500" : "border-gray-800"
            }`}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="password"
            className={`w-full px-3 py-2 border ${
              confirmError ? "border-red-500" : "border-gray-800"
            }`}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirm(e.target.value);
              validateConfirm(e.target.value);
            }}
            required
          />
          {confirmError && (
            <p className="text-red-500 text-sm">{confirmError}</p>
          )}
        </div>
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
        <button
          className="bg-black text-white font-light px-8 py-2 mt-4"
          onSubmit={handleLoginSignup}
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
