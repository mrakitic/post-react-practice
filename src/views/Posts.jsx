import React, { Component } from "react";
import "../Post.css";
import { Link } from "react-router-dom";
import { Pagination } from "../components";

export class Posts extends Component {
  state = {
    posts: undefined,
    currentPage: 1,
    itemsPerPage: 5,
    totalCount: 100
  };

  setPage = event => {
    const { value } = event.target;
    this.setState({
      currentPage: parseInt(value)
    });
  };

  setTotalCount = posts => {
    this.setState({
      totalCount: posts.length
    });
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

  componentWillUpdate(nextProps) {
    const { posts } = this.props;
    if (posts !== nextProps.todos) {
      this.setTotalCount(nextProps.props);
    }
  }
  renderItem = ({ id, title }) => (
    <div key={id}>
    <h2 className="item-title">
      <Link to={`/post/${id}`}>
        <div>{title}</div>
      </Link>
      </h2>
    </div>
  );

  render() {
    const { posts, currentPage, itemsPerPage } = this.state;
    if (!posts) {
      return <p>Loader</p>;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedPosts = posts.slice(startIndex, endIndex);
    return (
      <main className="main wrapper">
        <h1>This are Posts!</h1>
        <div className="list">        
          {pagedPosts.map(item => this.renderItem(item))}
          <Pagination {...this.state} setPage={this.setPage} />
        </div>
      </main>
    );
  }
}
