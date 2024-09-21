import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [guardianLoggedIn, setGuardianLoggedIn] = useState(() => {
    const storedGuardian = localStorage.getItem("guardianLoggedIn");
    return storedGuardian ? JSON.parse(storedGuardian) : null;
  });
  const [carerLoggedIn, setCarerLoggedIn] = useState(() => {
    const storedCarer = localStorage.getItem("carerLoggedIn");
    return storedCarer ? JSON.parse(storedCarer) : null;
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
