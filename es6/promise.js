/**
 * Created by Rayr Lee on 2016/6/8.
 */
'use strict'
let promise = new Promise(function (resolve, reject) {
    console.log('1 say Promise');
    //resolve();//成功
    reject();//失败
});

promise.then(function () {    //成功时回调
    console.log(' 2 say Resolved.');
}, function () {            // 失败时回调
    console.log('3 say reject.');
});

console.log(' 4 say Hi!');


//anther
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(1000).then((value) => {
    console.log(' 5 say ' + value);
});


//anther
let promised = new Promise(function (resolve, reject) {
    console.log('6 say promise');
    resolve();
});

promised.then(function () {
    console.log("7 say Resolved");
}, function () {
    console.log(" 8 say Reject");
})

console.log("9 say Hi!")


//异步加载图片的例子
function loadImgAsync(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.onerror = function () {
            reject(new Error('Could not load image at ' + url))
        };
        image.src = url;
    })
}


//Promise对象实现的Ajax操作的例子

var getJSON = function (url) {
    var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
            if (this.readyState !== 4) {
            }
            return;
        }
        if (this.status == 200) {
            resolve(this.response);
        } else {
            reject(new Error(this.statusText));
        }
    })
    return promise;
};

getJSON("/posts.json").then(function(json){
    console.log('Contents'+json);
},function(error){
    console.error('出错了',error);
})


//p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
// var p1= new Promise (function(resolve,reject){
//     //..
// });
//var p2= new Promise (function(resolve,reject){
//    //...
//    resolve(p1);
//})

var p1= new Promise(function(resolve,reject){
    setTimeout(()=>reject(new Error('fail')),300)
})

var p2 =new  Promise(function(resolve,reject){
    setTimeout(()=> resolve(p1),1000)
})
p2.then(result => console.log(result))
p2.catch(error => console.log(error))