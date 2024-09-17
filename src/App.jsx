import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import GuardianDashboard from "./components/Guardian/GuardianDashboard";
import CarerDashboard from "./components/Carer/CarerDashboard";
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./components/Context/UserContext";
import Header from "./components/Header/Header";

function App() {
  const { guardianLoggedIn, carerLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (guardianLoggedIn) {
      setUserLoggedIn("guardian");
    }
    if (carerLoggedIn) {
      setUserLoggedIn("carer");
    }
    setIsLoading(false);
  }, [guardianLoggedIn, carerLoggedIn]);

  return isLoading ? (
    "Loading"
  ) : (
    <div className="bg-backgroundCream h-screen box-border px-3">
      {console.log(userLoggedIn)}
      {(guardianLoggedIn || carerLoggedIn) && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            guardianLoggedIn ? (
              <GuardianDashboard />
            ) : carerLoggedIn ? (
              <CarerDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            guardianLoggedIn || carerLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
