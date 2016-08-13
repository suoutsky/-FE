Function.prototype.bind = function (context){
	//保存调用BIND的函数
	var func = this 
	// 返回 一个函数 
	return function () {
        //返回的函数里 又
		return func.apply(context)
	}
}


Function.prototype.bind = function (context) {
	var func =this,
	args = [].slice.call(arguments,1);
	return function () {
      return func.apply(context, args.concat([].slice.call(arguments)))
	}
}

var func;
func = (function (_this){
	return function () {
		return func(body);
	}
})(this)


var func ;
func = (function (){
    _this = this
	return function() {
		return func(body)
	}
})()

var self = this 
return (
  <div>
   {this.props.items.map(function(item,i){
      return(
      		<div
      		onClick = {function(item,i){
      			self.handleClick(i);
      		}}
      		key = {i}>{item}</div>
      		>
      		</div>
      	)

   },this)}
  </div>
	)