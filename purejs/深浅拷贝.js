/**
 * Created by Rayr Lee on 2016/11/10.
 */
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(global.JSON){  //golob
        str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};

var obj = {a:1, arr:[1,2]};
var obj1 = obj;              //浅复制
var obj2 = cloneObj(obj);   // 深拷贝

obj2.a = 2;
console.log(obj);