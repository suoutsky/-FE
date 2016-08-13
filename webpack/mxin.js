function augment(destClass, srcClass) {
	var destProto = destClass.prototype
	var srcproto = srcClass.prototype
	for (var method in srcproto){
		if(!destProto[method]) {
			destProto[method] = srcproto[method]
		}
	}
}

function Person() { }
Person.prototype.getName = function () {}
Person.prototype.getAge = function () {}

function Student () {}

augment (Student, Person)
var s1 = new Student()
console.log(s1)

function augment (destClass, kd) {
	var classes = Array.prototype.slice.call(argument,1)
	for (var i=0; i<classes.length; i++) {
		var srcClass = class
	}
}

function augment(destClass,srcClass,method) {
	var srcProto = srcClass.prototype
	var destProto = srcClass.prototype
	for (var i=0;i<methods.length;i++){
		var method = methods[i]
		if (!destProto[method]) {
            destProto[method] = srcProto[method]
		 }
	}
}

function Person () {}
Person.prototype.getName = function () {}
Person.prototype.setName = function () {}
Person.prototype.getAge = function () {}
Person.prototype.setAge = function ( ) {}
function Student () {}
augment(Student, prototype, ['getName', 'setName'])

var s1 = new Student()
console.log(s1)

import { increamentCounter } from '../vuex/actions'
export default {
  vuex: {
  	actions : {
  		increment: incrementCounter
  	}
  }	
}

const mutations = {
	INCREMENT (state, amount) {
		state.count = state.count + amount
	}
}
export function getCount (state) {
	return state.count
}

export const getCount = state => state.count

import {getCount} from '../vuex/getter'
export default {
	vuex: {
	  getters: {
	  	counterValue: getCount
	  }
	}
}

export default {
	methods: {
		redirect: function (path) {
			if(path) {
				this.$route.router.go({
					path: path
					force:true
				})
				return
			}
		}
	},
	const _currentTransition = this.$route.router._currentTransition
	if (_currentTransition && _currentTransition.form && _currentTransition.from.path
		&& !(_currentTransition.from.path.match('^\/sign'))){
		this.$route.router.go(_currentTransition.from.path)
	} else {
		this.$route.router.go('/')
	}
}
