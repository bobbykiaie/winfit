import "./App.css";
import React from "react";
import Login from "./components/pages/Login";
import { AuthProvider } from "./providers/UserProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Login />
      </AuthProvider>
    </div>
  );
}

export default App;
