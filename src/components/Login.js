import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleSignInToggle = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          alt="bgImage"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6cefb2f5-90be-4f57-adc4-f6c3c579273d/3943990c-f4e0-4147-82ad-f531e2b547f3/IN-en-20240401-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
      </div>

      <form className="text-white absolute rounded bg-black w-3/12 my-36 mx-auto p-12 right-0 left-0 bg-opacity-85">
        <h1 className="font-bold text-3xl py-3">
          {isSignIn ? "Sign In" : "SignUp"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full name"
            className="p-4 my-4 w-full bg-zinc-800 rounded-md opacity-60"
          />
        )}
        <input
          type="text"
          placeholder="Email or Phone number"
          className="p-4 my-4 w-full bg-zinc-800 rounded-md opacity-60"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-zinc-800 rounded-md opacity-60"
        />
        <button
          type="submit"
          className="bg-red-600  w-full p-2 rounded-lg text-lg my-4"
        >
          Sign In
        </button>
        <p className="">
          <span className="p-2 text-slate-300">
            {isSignIn ? "New to Netflix?" : "You are allready user"}
          </span>
          <span onClick={handleSignInToggle} className="cursor-pointer">
            {isSignIn ? "Sign up now." : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
