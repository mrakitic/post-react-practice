import React, { Component } from "react";

export class Posts extends Component {
  state = {
    posts: undefined,
    comments: undefined
  };

  componentDidMount() {
    const { match } = this.props;

    if (match && match.params.id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`)
        .then(response => response.json())
        .then(posts => this.setState({ posts }))
        .then(() =>
          fetch(
            `https://jsonplaceholder.typicode.com/posts/${
              match.params.id
            }/comments`
          )
            .then(response => response.json())
            .then(comments => this.setState({ comments }))
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <>
        <div>Id of your task: {posts.id}</div>
        <div>Title of your task: {posts.title}</div>
      </>
    );
  }
}
