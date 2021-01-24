
import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from '../src/providers/UserProvider'
import "./App.css"

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider> 
    <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
