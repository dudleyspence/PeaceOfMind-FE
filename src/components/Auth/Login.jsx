import React from "react";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getGuardianByUserId } from "../../axios/guardian.axios";

export default function Login() {
  const { setCarerLoggedIn, setGuardianLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

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
      navigate("/guardian-dashboard");
    });
  }
  function handleCarerLogin() {
    const demoCarer = {
      _id: "10",
      name: "John Doe",
      email: "jane.doe@example.com",
      role: "carer",
    };
    getGuardianByUserId(demoCarer._id).then((carer) => {
      setCarerLoggedIn(carer);
      localStorage.setItem("carerLoggedIn", JSON.stringify(carer));
      setGuardianLoggedIn(null);
      localStorage.removeItem("guardianLoggedIn");
      navigate("/carer-dashboard");
    });
  }

  return (
    <div>
      <h1>Welcome Back</h1>
      <button onClick={handleGuardianLogin}>Login as a Guardian</button>
      <button onClick={handleCarerLogin}>Login as a Carer</button>
    </div>
  );
}
