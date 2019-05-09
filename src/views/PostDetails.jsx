import React, { Component } from "react";

export class PostDetails extends Component {
  state = {
    details: undefined,
    comments: undefined,
    author:undefined
  };

  componentDidMount() {
    const { match } = this.props;

    const baseUrl = 'https://jsonplaceholder.typicode.com';

    if (match && match.params.id) {
      fetch(`${baseUrl}/posts/${match.params.id}`)
        .then(response => response.json())
        .then(details => {
          this.setState({
            details
          });

          return details.userId;
        })
        .then(userId =>
          fetch(`${baseUrl}/users/${userId}`)
            .then(response => response.json())
            .then(author => this.setState({ author }))
        )
        .then(() =>
          fetch(`${baseUrl}/comments?postId=${match.params.id}`)
            .then(response => response.json())
            .then(comments => this.setState({ comments }))
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    const { details } = this.state;
    const { comments } = this.state;
    const {author} =this.state;      

        
    return (
      <>
        {details && <div>Id of your post: {details.id}</div>}
       {details && <div>Title of your post: {details.title}</div>}
      { author && <div>Post owner:{author.name}</div>}
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
