// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAz-GuevR8EgZ3iAWJ9WJdfl-H4gPb3-W4",
  authDomain: "peaceofmind-99d3e.firebaseapp.com",
  projectId: "peaceofmind-99d3e",
  storageBucket: "peaceofmind-99d3e.appspot.com",
  messagingSenderId: "483643163922",
  appId: "1:483643163922:web:3502198791de0915a59fcb",
  measurementId: "G-ZK9TG0J5XK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
