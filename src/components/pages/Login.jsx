import React, { useState, useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase/firebase";
import { AuthProvider, useAuth } from "../../providers/UserProvider";

const Login = () => {
  const { currentUser, logout } = useAuth();
  const handleSubmit = async () => {
    await signInWithGoogle();
  };

  const handleLogOut = async () => {
    logout();
  };

  return (
    <div>
      <AuthProvider>
        <h1>Login Page</h1>
        <button onClick={handleSubmit}>Sign In </button>
        <button onClick={handleLogOut}>Log Out</button>
        <h1>Current User is: {currentUser}</h1>
      </AuthProvider>
    </div>
  );
};

export default Login;
