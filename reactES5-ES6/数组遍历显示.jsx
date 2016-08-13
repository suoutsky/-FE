var React = require('react');
var RepeatArray = React.createClass({
  render: function() {
    var names = ['Alice','kobe','kd'];
    var arrs = [
      <h1>hello world</h1>,
        <h1>React is awesome</h1>
    ];
    return (
      <div>
        {arr}
        {
          names.map(function(name){
            return (
              <div>Hello,{name}!</div>
            )
          })
        }

      </div>
    )
  }
})
module.exports = RepeatArray;



//ES6

import React from 'react'

export default class RepeatArray extends React.Component {
    constructor (){
      super();
    }
    render () {
      var arr = [
        <h1>Hello world!</h1>,
        <h2>React is awesome </h2>,  //数组最后一位加 {，}  也可
      ];
      var names = ['Alice', 'kobe', 'kd'];
      return (
        <div>
          {arr}
          {
            names.map((name) => {return <div>Hello, {name}!</div>})
          }
        </div>
      )
    }
    


}
