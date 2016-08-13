var React = require('react')

var HelloMessage = React.createClass({
  render: function(){
    return (<h1>Hello,{this.props.name}!</h1>);
  }
})

module.exports = React.createClass({
  render:function(){
    return(
      <div>
        <HelloMessage name="kobe"/>
      </div>
    )
  }
})


//ES6

import React,{ Component } from 'react';

class HelloMessage extends Component {
  constructor(){
    super();
  }
  render(){
    return (
      <h1> Hello {this.props.name}</h1>
    )
  }
}

export default class Output extends Component{
  constructor () {
    super()
  }
  render(){
    return (
      <div>
        <HelloMessage name="Json"/>
      </div>
    );
  }
}
