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
  const [currentUser, setCurrentUser] = useState();
  const value = {
    currentUser,
    logout,
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user.displayName)
            setCurrentUser(user.displayName)
          } else {
            console.log("none")
            setCurrentUser("none")
          }
      
      
    })

    return unsubscribe
  }, [])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
