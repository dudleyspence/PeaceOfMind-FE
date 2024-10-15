import { Route, Routes } from "react-router-dom";
import GuardianDashboard from "./components/Guardian/GuardianDashboard";
import CarerDashboard from "./components/Carer/CarerDashboard";
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./components/Context/UserContext";
import Header from "./components/Header/Header";

import CarerPatientView from "./components/Patient/CarerView/CarerPatientView";
import PatientDayView from "./components/Patient/DayView/PatientDayView";
import { GuardianPatientView } from "./components/Patient/GuardianView/GuardianPatientView";
import { LoginPage } from "./components/Auth/LoginPage";
import { SignUpPage } from "./components/Auth/SignUpPage";
import { useAuth } from "./components/Context/AuthContext";

function App() {
  const { guardianLoggedIn, carerLoggedIn, loading } = useAuth();

  return loading ? (
    "Loading"
  ) : (
    <div className="bg-backgroundCream min-h-screen box-border px-3">
      {(guardianLoggedIn || carerLoggedIn) && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/SignUp/:role" element={<SignUpPage />} />
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
          path="/patient/:patient_id"
          element={
            guardianLoggedIn ? (
              <GuardianPatientView />
            ) : carerLoggedIn ? (
              <CarerPatientView />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/patient/:patient_id/:isoDate"
          element={
            guardianLoggedIn || carerLoggedIn ? (
              <PatientDayView />
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
