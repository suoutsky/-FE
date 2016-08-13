///**
// * Created by admin on 16/6/26.
// */
//this.name = 1000
//
//var obj = {
//    name: 100,
//    test: function () {
//      console.log(this.name)
//        return function () {
//            console.log(this.name)
//        }
//    }
//}
//
//    function go() {
//
//    }
//(obj.test())()

this.a = 1000;
function liuxu() {
  this.a = 1;
}
liuxu.prototype.geta = function () {
    return this.a = 2;
}

var p =new liuxu;

console.log(p.a)