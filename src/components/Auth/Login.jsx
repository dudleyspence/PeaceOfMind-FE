import React, { useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCarerByUserId, getGuardianByUserId } from "../../axios/index.axios";

import largeLogo from "../../assets/Logo/PeaceOfMind_logo_large.png";

export default function Login() {
  const { setCarerLoggedIn, setGuardianLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCarerLoggedIn(null);
    setGuardianLoggedIn(null);
  }, []);

  function handleGuardianLogin() {
    const demoGuardian = {
      _id: "11",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "guardian",
    };
    getGuardianByUserId(demoGuardian._id).then((guardian) => {
      setGuardianLoggedIn(guardian);
      localStorage.setItem("guardianLoggedIn", JSON.stringify(guardian));
      setCarerLoggedIn(null);
      localStorage.removeItem("carerLoggedIn");
      navigate("/dashboard");
    });
  }
  function handleCarerLogin() {
    const demoCarer = {
      _id: "10",
      name: "John Doe",
      email: "jane.doe@example.com",
      role: "carer",
    };

    getCarerByUserId(demoCarer._id).then((carer) => {
      setCarerLoggedIn(carer);
      localStorage.setItem("carerLoggedIn", JSON.stringify(carer));
      setGuardianLoggedIn(null);
      localStorage.removeItem("guardianLoggedIn");
      navigate("/dashboard");
    });
  }

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <img
        src={largeLogo}
        alt="piece of mind logo"
        className="w-5/6 max-w-screen-sm mt-5"
      />
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="h-3/5 w-3/5 flex flex-col justify-evenly items-center bg-blue-100 p-5  box-content rounded-md shadow-lg">
          <h1 className="justify-self-start font-bold text-2xl">
            Welcome Back
          </h1>
          <button
            className="bg-blue-600 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            onClick={handleGuardianLogin}
          >
            Login as a Guardian
          </button>
          <button
            className="bg-blue-600 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            onClick={handleCarerLogin}
          >
            Login as a Carer
          </button>
        </div>
      </div>
    </div>
  );
}
