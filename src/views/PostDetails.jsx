import React, { Component } from "react";

export class PostDetails extends Component {
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
            `https://jsonplaceholder.typicode.com/comments?postId=${
              match.params.id
            }`
          )
            .then(response => response.json())
            .then(comments => this.setState({ comments }))
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    const { posts } = this.state;
    const { comments } = this.state;

    console.log(comments);
        
    return (
      <>
        {posts && <div>Id of your post: {posts.id}</div>}
       {posts && <div>Title of your post: {posts.title}</div>}
        <div>        
            {comments
            ? comments.map(item => (
                <div key={item.id}>
                  <h2 className="item-title">                    
                      <div>{item.name}</div>                    
                    <div>{item.id}</div>
                  </h2>
                  </div>
                  
                  )) : 'No comments'}


                  </div>
                  
                  
      </>
    );
  }
}
