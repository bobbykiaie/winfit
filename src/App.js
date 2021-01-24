import "./App.css";
import React, { useContext, useEffect } from "react";
import Login from "./components/pages/Login";
import { AuthProvider, useAuth } from "./providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";

/*
Switch determines what route we're on
*/
function App() {

  const loginContext = useAuth().isLoggedIn

  useEffect(() => {
    
    console.log(loginContext)


  })

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
             {loginContext ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <Route path="/dashboard">
            {loginContext ? <Dashboard /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
