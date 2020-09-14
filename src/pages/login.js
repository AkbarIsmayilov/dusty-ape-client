import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//MUI stuff
import {
  Grid,
  withStyles,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import AppIcon from "../images/icon.png";

const styles = {
  form: {
    textAlign: "center",
  },
  email: {},
  customHelperText: {
    color: "red",
    fontSize: 12,
    margin: 12,
  },
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({
      loading: true,
    });
    axios
      .post("/login", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.error(err.response.data);
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
    });
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} className={classes.icon} width={70} alt="logo" />
          <Typography className={classes.header} variant="h3">
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={this.state.email}
              className={classes.email}
              fullWidth
              onChange={this.handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              value={this.state.password}
              className={classes.password}
              fullWidth
              onChange={this.handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customHelperText}>
                {" "}
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              disabled={loading}
              onClick={this.handleSubmit}
            >
              {loading ? <CircularProgress /> : "Login"}
            </Button>
          </form>
          <Typography>
            Don't have an account , sign up <Link to={"signup"}>here</Link>
          </Typography>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(login);
