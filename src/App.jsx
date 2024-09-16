import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import { UserProvider } from "./components/Context/UserContext";
import GuardianDashboard from "./components/Guardian/GuardianDashboard";
import CarerDashboard from "./components/Carer/CarerDashboard";

function App() {
  return (
    <div className="app-container">
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/guardian-dashboard" element={<GuardianDashboard />} />
          <Route path="/carer-dashboard" element={<CarerDashboard />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
