import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./stylesheets/index.css";
import { UserProvider } from "./components/Context/UserContext";
import { Provider } from "react-redux";
import store from "../src/state/store.js";
import { AuthProvider } from "./components/Context/AuthContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
