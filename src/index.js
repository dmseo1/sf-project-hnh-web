import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";


import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import NaverLoginOKPage from "views/NaverLoginOKPage/NaverLoginOKPage.jsx";
import JoinPage from "views/JoinPage/JoinPage.jsx"
import LogoutPage from "views/LogoutPage/LogoutPage.jsx";
import MainPage from "views/MainPage/MainPage.jsx";
import InquiryMainPage from "views/InquiryMainPage/InquiryMainPage.jsx";


var hist = createBrowserHistory();

ReactDOM.render(

    <Router history={hist}>
      <Switch>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/join" component={JoinPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/login/naver/ok" component={NaverLoginOKPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/inquiry" component={InquiryMainPage} />
        <Route path="/components" component={Components} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  ,  document.getElementById("root")
);

