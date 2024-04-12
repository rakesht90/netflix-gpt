// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnWjXXmP5rIvcwtOF9DiM-cH5m5q6NiAY",
  authDomain: "netflixgpt-4fba1.firebaseapp.com",
  projectId: "netflixgpt-4fba1",
  storageBucket: "netflixgpt-4fba1.appspot.com",
  messagingSenderId: "821853030590",
  appId: "1:821853030590:web:25a44fd4027b811e9636ef",
  measurementId: "G-TEHG2211RV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
