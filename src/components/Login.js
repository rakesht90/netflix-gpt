import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidationData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleSignInToggle = () => {
    setIsSignIn(!isSignIn);
  };
  const handleSubmit = (e) => {
    let message;
    if (isSignIn) {
      // For sign-in mode, validate email and password only
      message = checkValidationData({
        email: email.current.value,
        password: password.current.value,
      });
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // For sign-up mode, validate fullName, email, and password
      message = checkValidationData({
        fullName: fullName.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      if (message) return;
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    setErrorMessage(message);
  };
  return (
    <div className="">
      <Header />

      <div className="absolute">
        <img
          alt="bgImage"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6cefb2f5-90be-4f57-adc4-f6c3c579273d/3943990c-f4e0-4147-82ad-f531e2b547f3/IN-en-20240401-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-white absolute rounded bg-black w-3/12 my-36 mx-auto p-12 right-0 left-0 bg-opacity-85"
      >
        <h1 className="font-bold text-3xl py-3">
          {isSignIn ? "Sign In" : "SignUp"}
        </h1>
        {!isSignIn && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full name"
            className="p-4 my-4 w-full bg-zinc-800 rounded-md opacity-60"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or Phone number"
          className="p-4 my-4 w-full bg-zinc-800 rounded-md opacity-60"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-zinc-800 rounded-md opacity-60"
        />
        <p className="text-xs py-2 text-red-500">{errorMessage}</p>
        <button
          type="submit"
          className="bg-red-600  w-full p-2 rounded-lg text-lg my-4"
          onClick={handleSubmit}
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
