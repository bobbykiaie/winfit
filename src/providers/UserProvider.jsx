import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshState, setRefreshState] = useState(false)

  function logout() {
    setCurrentUser(null)
    setUserEmail(null)
    return auth.signOut();
  }
  function refresh(state) {
    setRefreshState(state)
  }
  
  const value = {
    currentUser,
    userEmail,
    isLoggedIn,
    logout,
    refreshState,
    refresh
  };
  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged((user) => {
      if (user) {
       
        setCurrentUser(user.displayName);
        setUserEmail(user.email);
        setIsLoggedIn(true);
        console.log("current user name: " + currentUser)
  
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, [isLoggedIn]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
