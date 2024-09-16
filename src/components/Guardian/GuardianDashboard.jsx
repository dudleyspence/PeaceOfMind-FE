import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function GuardianDashboard() {
  const { userLoggedIn, guardianLoggedIn } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome back {guardianLoggedIn.user.name}</h1>
    </div>
  );
}
