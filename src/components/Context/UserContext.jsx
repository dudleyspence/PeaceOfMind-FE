import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [guardianLoggedIn, setGuardianLoggedIn] = useState(() => {
    const storedGuardian = localStorage.getItem("guardianLoggedIn");
    return storedGuardian ? storedGuardian : null;
  });
  const [carerLoggedIn, setCarerLoggedIn] = useState(() => {
    const storedCarer = localstorage.getItem("carerLoggedIn");
    return storedCarer ? storedCarer : null;
  });

  return (
    <UserContext.Provider
      value={{
        guardianLoggedIn,
        setGuardianLoggedIn,
        carerLoggedIn,
        setCarerLoggedIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
