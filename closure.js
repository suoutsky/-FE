/**
 * Created by admin on 16/8/13.
 */
//function f1() {
//    var n = 1;
//    function f2() {
//        console.log(n)
//    }
//      return f2();
//}
//
//
//var result = f2();


//一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。

//1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
//2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便
//改变父函数内部变量的值。


function outerFun()
{
    var a=0;
    function innerFun()
    {
        a++;
        console.log(a);
    }
    return innerFun;  //注意这里
}
var obj=outerFun();
obj();  //结果为1
obj();  //结果为2
var obj2=outerFun();
obj2();  //结果为1
obj2();  //结果为2


//闭包是一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数）