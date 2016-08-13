var CommentList = React.creatClass({
  render: function() {
    return(
      <div className="commentList">
         Hello, world! I am a CommentList.
         <Comment author="Pete Hunt">This is kobe</Comment>
         <Comment author= "Jordan Walke">This is anther comment</Comment>
      </div>
    )
  }
});

var CommentFrom = React.createClass({
  render: function(){
    return (
      <div className = "commentFrom">
           Hello, world! I am a CommentForm.
      </div>
    )
  }
})

var CommentBox = React.createClass({
  render: function(){
    return(
      <div>
        <h1>Comment</h1>
        <CommentList/>
        <CommentFrom/>
      </div>
    )
  }
})


var Comment = React.createClass({
    render: function () {
      <div className="comment">
        <h2 className = "commentAuthor">
          {this.props.author}
        </h2>
          {this.props.children}
        </h2>
      </div>
    }
})
