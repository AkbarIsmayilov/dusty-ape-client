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

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
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
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.setState({
      loading: true,
    });
    axios
      .post("/signup", userData)
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
            Sign Up
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              label="ConfirmPassword"
              value={this.state.confirmPassword}
              className={classes.password}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              id="handle"
              name="handle"
              type="handle"
              label="Handle"
              value={this.state.handle}
              className={classes.handle}
              fullWidth
              onChange={this.handleChange}
              error={errors.handle ? true : false}
              helperText={errors.handle}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customHelperText}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              disabled={loading}
              onClick={this.handleSubmit}
            >
              {loading ? <CircularProgress /> : "Sign Up"}
            </Button>
          </form>
          <Typography>
            Already have an account , login<Link to={"login"}>here</Link>
          </Typography>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(signup);
