/**
 * Created by Rayr Lee on 2016/6/8.
 */
'use  strict'
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());


function* go(){
    yield 123+456;
}
var zgo=go();
console.log(zgo.next());


function* f(){
    console.log('执行了！')
}
var generator =f ();
setTimeout(function(){
    generator.next()
},2000)

var arr=[[1],[[2,3],4],[5,6],[7,[8,[9,10]]] ]
//var flat =function* (a){
//    a.forEach(function(item){
//        if (typeof item !=='number'){
//            yield* flat(item);
//        }else{
//            yield item;
//        }
//    })
//};

var flat =function*(a){
    var length=a.length;
    for(var i=0;i<length;i++){
        var item=a[i];
        if(typeof item!=='number'){
            yield*flat(item);
        }else{
            yield item;
        }
    }
}
//遍历多维数组数组
for (var f of flat(arr)){
    console.log(f);
}


//另外，yield语句如果用在一个表达式之中，必须放在圆括号里面
//console.log("hello"+yield);
//console.log('hello'+(yield 123));

//另外，yield语句如果用在一个表达式之中，必须放在圆括号里面
var myIterable = {};
myIterable[Symbol.iterator] = function*(){
    yield 1;
    yield 2;
    yield 3;
}
//[...myIterable]

//另外，yield语句如果用在一个表达式之中，必须放在圆括号里面
function* fs(){
    for (var i=0;ture;i++){
        var reset = yield i;
        if(reset){i=-1;}
    }
}
var g = fs();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
