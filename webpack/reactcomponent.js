var Comment = React.createClass({
	rawMarkup: function (){
	var rawMarkup = marked(this.props.children.toString(),{sanitize:true});
	return {__html: rawMarkup};
},
render: function () {
	return(
      <div className="comment">
        <h2 className="commentAuthor">
           {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
		)}
})

var CommentBox = React.createClass({
	loadCommentsFromServer: function () {

	},
	handleCommentSubmit: function (comment) {

	},
	getInitialState: function () {
		return {data: []};
	},
	componentDidMount: function () {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer,this.props.pollInterval);
	},
	render: function () {
		return (
			<div className="commentBox">
			  <h1>Comments</h1>
			  <CommentList data={this.state.data}/>
			  <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
			)
	}
})

var CommentList = React.createClass({
	render: function() {

		var commentNodes = this.props.data.map(function(comment){
          return(
          	<Comment author={comment.author} key={comment.id}>
          		{comment.text}
          	</Comment>
          	)
		})
		return (
			<div className="CommentList">
				{commentNodes}
			</div>
			)
	}
})

var CommentFrom = React.createClass({
	getInitialstate:function () {
		return {author:'',tetx:''}
	},
	handleAuthorChange: function(e){
		this.steState({author:e.target.value})
	},
	handleTextChange: function (e){
		this.setState({author:e.target.value})
	},
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.state.author.trim()
		var text = this.state.text.trim()
		if(!author||!text){
			return;
		}
		this.props.onCommentSubmit({author:author,text:text})
		this.setState({author:'',text:''})
	},
	render: function () {
		return(
			<form className="CommentFrom" onSubmit={this.handleSubmit}>
			<input
			  type="text"
			  placeholder="your name"
			  value={this.state.author}
			  onChange={this.handleAuthorChange}
			  />
			  <input type="text" placeholder="say ..." value={this.state.text} onChange={this.handleTextChange} />
			  <input type="submit" value="post"/>
			</form>
			)
	}
})
ReactDOM.render(
	<CommentBox url="/api/comments" pollInterval={2000} />,
	document.getElementById('content')
	)