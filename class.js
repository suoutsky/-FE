/**
 * Created by admin on 16/8/12.
 */
'use strict'

//var target = {a:1};
//
//var source1 = {b:2};
//
//var source2 = {c:23};
//
//
//Object.assign(target, source1, source2)
//
//
//console.log(target);

//如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
//var target = {a:1, b:1};
//
//var source1 = {b:2, c:2};
//
//var source2 = {c:3};
//
//
//Object.assign(target, source1, source2)
//
//
//console.log(target);
//

//如果只有一个参数，Object.assign会直接返回该参数。
//var obj = {a:1};
//Object.assign(obj)
//
//console.log(Object.assign(obj))

console.log(typeof Object.assign(2))


//如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。

//var v1 = 'abc';
//var v2 = true;
//var v3 = 10;
//
//var obj = Object.assign({}, v1, v2, v3);
//
//console.log(obj);
//console.log(Object('abc'));

//Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

var obj1 = {a: {b: 1}};

var obj2 = Object.assign({},obj1);

obj1.a.b = 3;

console.log(obj2.a.b)


//(1)  给对象添加属性

class Point {
    constructor(x, y){
        Object.assgin (this, {x, y});
    }
}

// 合并多个对象

const merge =

    (target, ...sources) => Object.assign(target, ...sources);

const merge =
    (target, ...source) => Object.assign({},target,...sources);

const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};

function processContent(options){
    let options = Object.assign({},DEFAULTS, options);
}


