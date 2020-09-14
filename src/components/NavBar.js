import React, { Component } from "react";

//MUI  Stuff

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../App.css";
class NavBar extends Component {
  render() {
    return (
      <AppBar>
        <div className="navbar-container ">
          <Toolbar>
            <Button component={Link} to={"/"}>
              Home
            </Button>
            <Button component={Link} to={"/login"}>
              Login
            </Button>
            <Button component={Link} to={"/signup"}>
              Sign Up
            </Button>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}

export default NavBar;
