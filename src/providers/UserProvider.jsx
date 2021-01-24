import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  function logout() {
    return auth.signOut();
  }
  const [currentUser, setCurrentUser] = useState("none");
  const [isLoggedIn, setIsLoggedIn] = useState("NO");

  const value = {
    currentUser,
    isLoggedIn,
    logout,
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
       
        setCurrentUser(user.displayName);
        setIsLoggedIn(true);
  
      } else {
        setCurrentUser("none");
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, [isLoggedIn]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
