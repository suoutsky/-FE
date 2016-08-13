function mapStateToProps(state) {
   return {
   	  counter: state.counter
   }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(CounterActions,dispatch)  //将所有action 方法绑定到 props上
}

export default connect (mapStateToProps, mapDispatchToProps)(Counter)

import {bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as CounterActions from '../actions/counter'
function mapStateToProps(state) {
	return {
		counter: state.counter
	}
}

export default connect (mapStateToProps, CounterActions)(Counter)

function mapStateToProps(state) {
	return {
		counter: state.counter
	}
}

export default connect(mapStateToProps)(Counter)

export function increment () {
	return {
		type: increment 
	}
}

export function decrement () {
	return {
		type: decrement
	}
}

export function incrementIfOdd() {
	return (dispatch, getState) => {
		const { counter } => getState ()
		if(counter % 2 === 0){
			return
		}
		dispatch(increment())
	}
}

export function incrementAsync(delay = 1000){
	return dispatch => {
		setTimeout( () => {
			dispatch(increment(),delay)
		})
	}
}

export default function counter(state = 0, action ){
	switch (action.type){
		case increment
		  return state +1
		case decrement
		  return state -1
		default:
		  return state    
	}
}

const rootReducer = combineReducers ({
	counter
})

export default rootReducer
import { createStore, applyMiddleware } from 'redux'
import thunck from 'redux-thunck'
import reducer from '../reducers'
const createStoreWithMiddleware = applyMiddleware (thunck)(createStore)
export default function configureStore(initialState){
	const store = createStoreWithMiddleware(reducer,initialState)
	if (module.hot){
		module.hot.accept('../reducers',() => {
			const nextReducer = require('../reducers')
			store.replaceReducer(nextReducer)
		})
	}
	return store
} 

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var app = new (require('express'))()
var port = 3000
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler)) 
app.use(webpackHotMiddleware(compiler))
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html')
})

app.listen(port,function(error){
})

const completedCount = todos.reduce ((count,todo) => 

	todo.completed ? count+1 : count ,
     0
	)

return state.filter(todo => 
     todo.id != = action.id
	)

const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)

const areAllMarked = state.every(todo => todo.completed)

return [
   {
   	 id: state.reduce((maxId,todo) => Math.max(todo.id, maxId), -1) +1,
   }

]

import { combineReducers } from 'redux'
import counter from './counter'
import {
	INCREMENT_COUNTER,REDO_COUNTER

} from '../action/counter'

(previousState, action) => newState //redux  reducer
// thunk-middleware 
export default function thunkMiddleware({dispatch, getState}) {
	return next => action =>
	typeof action === 'function' ? action(dispatch, getState) : next(action)
}

const reducer = combineReducers(reducers)
const finalCreateStore = applyMiddleware

const rootReducer = combineReducers({
	counter: undoable(counter, {
		filter: includeAction([INCREMENT_COUNTER,DECREMENT_COUNTER]),
		limit: 10,
		debug: true,
		undoType: UNDO_COUNTER,
		redoType: REDO_COUNTER
	})
})

export default rootReducer

export default store => next => action => {
	const callAPI = action 
}

function addTodo(text) {
	return {
		type:ADD_TODD,
		text
	}
}
store.dispatch(addTodo(text))

(previousState, action) => newState
combineReducers

store.getState()
store.dispatch(action)
store.subscribe(listener)
createStore(reducer, [initialState])

export default function thunckMiddleware({dispatch, getState}) {
	 return next => action =>
	 typeof action === 'function' ? action(dispatch,getState) : next(action)
}

const reducer = combineReducers(reducers) //返回整合后的 reducers 各种reduce集合
const finalCreateStore = applyMiddleware(promiseMiddleware, warningMiddleware,loggerMiddleWare)(createStore)
const store = finalCreateStore(reducer)


createStore(reducer,[initialState]//store 初创
store.getState() // 获取state
store.dispatch(action) // 触发 state 更新
store.subscribe(listener)     
// reducer . [助剂] 还原剂；减径管 (previousState, action) => newState
// combineReducers(reducers)

export default function thunkMiddleware({dispatch,getState}){
	return next => action => typeof action === 'function' ? action(dispatch,getState) : next(action)
}

export default store => next => action =>{
	const callAPI = action[CALL_API]  // store action next    返回的是 dispatch
	if (typeof callAPI ==='undefined'){   //  如果callAPI  未定义
		return next(action)
	}

    let { endpoint } = callAPI
    const { schema, types } = callAPI //n. [计][心理] 模式；计划；图解；概要  schem

    if (typeof endpoint === 'function'){
       endpoint = endpoint(store.getState())
    }
     
     if(typeof endpoint !== 'string'){
     	throw new Error ('S')
     }
}

export default function applyMiddleware(...middleware){
	return (createStore) => (reducer, initialState, enhancer) => {
		var store = createStore(reducer, initialState, enhancer)
		var dispatch = store.dispatch
		var chain = []
		var middlewareAPI = {
			getState: store.getState,
			dispatch: (action) => dispatch(action)
		}
		chain = middleware.map(middleware => middleware(middlewareAPI))  //中间件数组
		dispatch = compse(...china)(store.dispatch)
		return {
			...store,
			dispatch
		}
	}
}

// middleware  dispatch 经过 一个action   dispatch     类似于添加上了 过滤的方法
// next () assign()   
 function updateProject (projectId, projiectName) {
 	request.put(`/project/${projectId}`,{projectName}).then(
       response => Object.assign({
       	{projectId, projectName},
       	response.data
       }) 	
     )
 }

 switch (action.type) {
 	...
 	case USER_LOGOUT:
 	   return {}
 }

 <Provider store={store}>
{() => <App/>}
 </Provider>
}

connect (mapStateToProps(store.state,store.props), mapDispatchToProps(store.dispatch, store.props(stateProps,dispatch.props)), mergeToProps)(app)

import  compose from  './compose'
export default function applyMiddleware(...middleware){
	return (next) => (reducer, initialState) => {
		var store = next (reducer, initialState);
		var dispatch = store.dispatch;
		var chain = [];

		var middlewareAPI = {
			getState: store.getState,
			dispatch:(action) => dispatch(action)
		};
		chain = middlewares.map (middleware => middleware(middlewareAPI))
		dispatch = compose(...chain)(store.dispatch)
		return {
			...store,
			dispatch
		}
	}
}

export default store => next =>action =>{
	console.log('dispatch',action);
	next(action);
	console.log('finish',action)
}

fetch ('doAct.action').then(function(res){
	if(res.ok){
		res.json().then(function(obj){

		})
	},function(ex){
		console.log(ex)
	}
})

arrayBuffer()
blob()
json()
text()
formData()

fetch('doAct.action',{credential:'incloud'}).then(function(res){
	if(res.ok){
		res.json().then(function(obj){

		})
	},function (ex){
		console.log(ex)
	}
})

fetch('').then(function(response){
	console.log(response.headers.get('Content-Type'))
	console.log(response.headers.get('Date'))
})
fetch('doAct.action',{
	method:'post',
	headers: {
		"Content-Type":"application/x-www-form-urlencoded;charst=utf-8"
	},
	body: 'foo=bar&lorem=ipsum'
})
.then(json)
.then(function(data){
	console.log('Request successded with JSON ',data);
})
.catch(function (error){
	console.log('Request faild',error);
})
<Redirect from='/aa' to='./sss/sss'/>

//redux
  import { createStore } from redux
  function counter (state = 0 ,action ) {
  	switch (action.type){
  		case 'INCREMENT':
  		 return state+1;
  		 case ''
  	}
  }

// API 是 { subscribe, dispatch, getState}
  let store = createStore(counter);
  store.subscribe(() => 
     console.log(store.getState())
  	)
// store.subscribe(() => console.log(store.getState))
store.dispatch({type:'INCREMENT'})

function visibilityFilter (state = 'SHOW_all',action){  //dispatch
	switch (action.type){
		case 'SET_VISBILITY_FILTER':
		  return action.filter
		  default:
		  return state
	}
}
const ADD_TODO = 'ADD_TODO'
{
	type: ADD_TODO,
	text:'Build my first Redux app'
}
 
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'  //action

function addTodo (text) {  //action 创建函数
	return{
		type: ADD_TODO
		text
	}
}

dispatch(add(text))
dispatch(completeTodo(index))

const boundAddTodo = (text) => dispatch(addTodo(text))
const boundCompleteTodo = (index) => dispatch (completeTodo(index))

boundAddTodo(text)
boundCompleteTodo(index)
connect()
// Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。
dispatch(addTodo(text))
dispatch(completedTodo(index))

[0,1,2,3,4].reduce(function(previousValue,currentValue, index,array){
	return previousValue + currentValue
})
Array.prototype.reduce(reducer,?initialValue)


import { visibilityFilter } from './actions'
const initialState = {
	visibilityFilter: visibilityFilter.SHOW_ALL,
	todos: []
}

function todoApp(state, action ){
	if(typeof state === 'underfined'){
		return initialState
	}
	return state
}

import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp, window.STATE_FROM_SERVER)

import {} from './action'
console.log(store.getState())
let unsubscribe = store.subscribe(() => 
	console.log(store.getState())
)
store.dispatch


store.dispatch(action)

let previousState = {                //旧的状态
	visibleTodoFilter: 'SHOW_ALL',
	todos: [
		{
			text: 'Read the docs',
			complete: false
		}
	]
}

let action = {                       //新的转态
	type: 'ADD_TODO',
	text:'Understand the flow'
}

let nextState = todoApp(previousState,action)     //返回新的状态


function todos(state = [], action) {  // 合并reduce
	return nextState
}

function visibleTodoFilter(state = 'SHOW_ALL' , action){ //合并reduce
	return nextState;
}

let todoApp = combineReducers({
	todos,
	visibleTodoFilter
})

return {
	todos: nextTodos,
	visibilityFilter: nextVisibleTodoFilter
}

Redux store 

store.subscrible(listener)

import React, { findDOMNode, Component, PropTypes } from 'react';
export default class AddTodo extends Component {
	render() {
		return (
			<div>
				<input type ='text' ref ='input'/>
				<button onClick={e => this.handleClick(e)}>
                   add
                 </button>  
			</div>
       )
	}
}

handleClick(e) {
	const node = findDOMNode(this.refs.input);
	const text = node.value.trim()
	this.props.onAddClick(text);
	node.value = '';
}

$('#tab').eq($(this).index()).show().siblings().hide();
var obj = {
	step1: function() {
		console.log('a');
		return this;
	},
	step2: function () {
		console.log('b');
		return this;
	},
	step3: function () {
		console.log('c');
		return this
	},
	step4: function (){
		console.log('d')
	}
}

obj.step1().step2().step3()
console.log('----/n')






{ entery:[String | Array | Object],
  output:{
  	path:String,
  	filename:String,
  	publicPath:String
  }
}


{
	entery:'./src/index.js',
	output:{
		path:'./dist',
		filename:'index.js'
	}
}

{
	entery:['./src/index.js'],
	output:{
		path:'./dist',
		filename:'index.js'
	}
}

{
	entry :['./src/index.js','./vendor.boostrap']
}

{
	test:String,
	loader: String | Array
}

{
	module:{
		loaders: [
{test:/\.jade$/, loader:'jade'}

		]
	}
}


store.dispatch({
	type:"complete_TODO"
	index:1

})

store.dispatch(action)
newState = reducer(previousState,action)
//  redux  

function creatStore(reducer, initialState){

}

var redux = require('redux')
var todoAppReducer = require('./reducer')
var initialState = {
	todos: []
}
var store = redux.createStore(todoAppReducer,initialState);


store.dispatch({
	type: 'ADD_TODO',
	title: 'new todo'
})

store.subscribe(function (){
   console.log(store.getState())
})

store.dispatch({
	type: 'ADD_TODO',
	title: 'new todo'
})

var unsubscribe = store.subscribe(function(){
	console.log(store.getState)
})

unsubscribe()

{
	visibilityFilter:'SHOW_ALL',
	todos:[
	{
        text: 'Consider using Redux'
        completed: true,
	},
	{
		text: 'Keep all store in a single tree',
		completed : false 
	}
	]
}



var async = require('async');  
var Backoff = require('backoff');  
var domotic = require('./domotic');

var connected = false;

var queue = async.queue(work, 1);

function work(item, cb) {  
  ensureConnected(function() {
    domotic.command(item.command, item.options, callback);
  });

  function callback(err) {    //出错的handle
    if (err && err.code == 'ECONN') {
      connected = false;
      work(item);
    } else cb(err);
  }
}

/// command

exports.command = pushCommand;

function pushCommand(command, options, cb) {  
  var work = {
    command: command,
    options: options
  };

  console.log('pushing command', work);

  queue.push(work, cb);
}

function ensureConnected(cb) {  
  if (connected) {
    return cb();
  } else {
    var backoff = Backoff.fibonacci();
    backoff.on('backoff', connect);
    backoff.backoff();
  }

  function connect() {
    domotic.connect(connected);   //通俗的  connected
  }

  function connected(err) {
    if (err) {
      backoff.backoff();
    } else {
      connected = true;
      cb();
    }
  }
}

/// disconnect

exports.disconnect = disconnect;

function disconnect() {  
  if (! queue.length()) {    // 执行队列无任务 时  断开
    domotic.disconnect();
  } else {
    console.log('waiting for the queue to drain before disonnecting');
    queue.drain = function() {
      console.log('disconnecting');
      domotic.disconnect();
    };
  }
}
`var queue = async.queue(work,1);
const ContainerComponent = connect(
  mapStateToProps: Function,
  mapDispatchToProps: Function
)(DymmyComponent)



<Provider store={store}>
<App/>                  ------->  
</Provider>

-----------------> 
<div>
  <AddTodo/>
  <Visible/>
  <Footer/>
</div>

function dispatch (action ) {
	currentState = currentReducer(currentState,action);
	listeners.slice().forEach(functin(listener){
		return listener();
	});
    return action;
}

getChildContext(){
	return { store: this.store }
	constructor(props, context) {
		super(props, context)
		this.store = props.store
	}
}
