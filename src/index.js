import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route , BrowserRouter, Switch, useLocation } from "react-router-dom";
import Signup from './login/Signup'
import Adminlogin from './adminPanel/Adminlogin';
import Dashboard from './adminPanel/Dashboard';
import Indexbooks from './book/Specbook';
ReactDOM.render(
  <Router history={BrowserRouter}>
    <Switch >
      <Route path = {"/"} exact component = {Adminlogin} /> 
      <Route path = {"/Signup"} exact component = {Signup} />
      <Route path= {"/Dashboard"} exact component = {Dashboard} />
      <Route path= {"/IndexBook"} exact component = {Indexbooks} />
      </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
