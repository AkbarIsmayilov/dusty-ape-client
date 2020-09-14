import React, { Component } from "react";
import "../App.css";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

class home extends Component {
  state = { posts: null };
  componentDidMount() {
    axios
      .get("/posts")
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => console.error(err));
  }
  render() {
    let recentPostMarkup = this.state.posts ? (
      this.state.posts.map((post) => {
        return <p>{post.body}</p>;
      })
    ) : (
      <p>Loading ... </p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentPostMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
