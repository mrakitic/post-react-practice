import React, { Component } from "react";
import "../Post.css";
import { Link } from "react-router-dom";

export class Posts extends Component {
  state = {
    posts: undefined
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(posts =>
        this.setState({
          posts
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="main wrapper">
        <h1>This are POSTS!</h1>
        <div className="list">
          {posts
            ? posts.map(item => (
                <div key={item.id}>
                  <h2 className="item-title">
                    <Link to={`/post/${item.id}`}>
                      <div>{item.title}</div>
                    </Link>
                    <div>{item.id}</div>
                  </h2>
                </div>
              ))
            : "No todos right now, check back later."}
        </div>
      </main>
    );
  }
}
