var ComponentWithDefaultProps = React.createClass({
	getDefaultProps: function() {
		return {
			value: 'default value'
		}
	}
})

var myComponent = React.createClass({
	propTypes: {
		children: React.propTypes.element.isRequired
	},
	render: function () {
		return (
           <div>
           		{this.props.children}
           </div>
		)
	}
})

// mixin
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);// 清除所有  this.intervals.map()
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // 引用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // 调用 mixin 的方法
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.  //时间+++
      </p>
    );
  }
});

React.render(
  <TickTock />,
  document.getElementById('example')
);

var FancyCheckbox = React.createClass({
	render: function() {
		var fancyClass = this.props.checked ? 'FancyChecked' : 'FancyUnchecked';
		return (
			<div className={fancyClass} onClick={this.props.onClick}>
				{this.props.children}
			</div>
			)
	}
})

React.render(
	<FancyChecked checked={true} onclick={console.log.bind(console)}>
	hello,KD!
	</FancyCheckbox>,
	document.body
	)

var {checked, ...other}=this.props;

var FancyCheckbox = React.createClass({
	render: function () {
		var {checked,...other} = this.props;
		var fancyClass = checked ? 'FancyChecked' :'FancyUnchecked'
		return (
				<div {...other} className = {fancyClass}/>
			)
	}
})
React.render(
	<FancyCheckbox checked={true} 
	)



var FancyCheckbox = React.createClass({
  render: function() {
  	var fancyClass = this.props.checked ? 'FancyChecked':'FancyUnchecked';
  	return ({
  		<div {...this.props} className={fancyClass} />
  	})
  }

})

<select value="B">
  <option value="A">Apply</option>
  <option value="b"> Banana</option>
  <option value="c">
</select>

<ReactCSSTransitionGroup transitionName = "example">
{items}
</ReactCSSTransitionGroup>













