import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/pages/Login";
import { AuthProvider, useAuth } from "./providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParam,
  useLocation,
  useParams
} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Navigation from "./components/items/NavBar";
import Test from "./components/pages/test"
import NewDash from "./components/pages/NewDash";
import CompDetails from "./components/pages/CompDetails";

/*
Switch determines what route we're on
*/
  function App()  {
  const { isLoggedIn } =  useAuth();
  const [loading, setLoading] =useState(true)


useEffect(()=>{
  if (isLoggedIn){
    setLoading(false)
  }

},[isLoggedIn])

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navigation />
      
          <Switch>
           
            <Route exact path="/dashboard">
              {loading ? <h1> </h1> : (isLoggedIn ? <Dashboard /> : <Redirect to="/" />)}
            </Route>
            <Route exact path="/dashboard/comp/:comp">
              {loading ? <h1> </h1> : (isLoggedIn ? <CompDetails /> : <Redirect to="/" />)}
            </Route>
            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <Route exact path="/test">
             <Test />
            </Route>
            
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}
  


export default App;
