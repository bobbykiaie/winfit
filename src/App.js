import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/pages/Login";
import { AuthProvider, useAuth } from "./providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Navigation from "./components/items/NavBar";
import NewDash from "./components/pages/NewDash";

/*
Switch determines what route we're on
*/
function App() {
  const loginContext = useAuth().isLoggedIn;
 const {isLoggedIn} = useAuth();

 const [login, setLogIn] = useState(true);

  useEffect(() => {
    setLogIn(isLoggedIn);

  },[isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navigation />
          <Switch>
   
            
            <Route path="/dashboard">
              {isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
