import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import PatientList from "../Patient/PatientList";

export default function GuardianDashboard() {
  const { guardianLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(guardianLoggedIn);
    if (!guardianLoggedIn) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [guardianLoggedIn]);

  return isLoading ? (
    "Loading User"
  ) : (
    <div className="h-auto flex flex-col items-center">
      <h1>Welcome back to Peace of Mind {guardianLoggedIn.user.name}</h1>
      <PatientList />
      <div className="bg-violet-200">
        <p>Name: {guardianLoggedIn.user.name}</p>
        <p>Email: {guardianLoggedIn.user.email}</p>
        <p>Phone: {guardianLoggedIn.phone}</p>
        <button>Click to update your contact info</button>
      </div>
    </div>
  );
}
