// AuthContext.js
import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [guardianLoggedIn, setGuardianLoggedIn] = useState(false);
  const [carerLoggedIn, setCarerLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    // const unsubscribe = onAuthStateChanged(auth, (user) => {});
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setGuardianLoggedIn(false);
        setCarerLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  const value = {
    currentUser,
    setCurrentUser,
    guardianLoggedIn,
    setGuardianLoggedIn,
    carerLoggedIn,
    setCarerLoggedIn,
    handleSignOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
