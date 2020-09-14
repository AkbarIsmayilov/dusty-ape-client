import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import signup from "./pages/signup";
import login from "./pages/login";
import home from "./pages/home";
import NavBar from "./components/NavBar";
import themeStyles from "./utils/theme";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";

const theme = createMuiTheme(themeStyles);

let authenticated;

const token = localStorage.getItem("FBIdToken");

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "./login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <div className="navbar-container ">
            <NavBar />
          </div>
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute
              exact
              path="/login"
              component={login}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path="/signup"
              component={signup}
              authenticated={authenticated}
            />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
