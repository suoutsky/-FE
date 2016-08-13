/**
 * Created by Rayr Lee on 2016/6/6.
 */

var data = { a: 1 }
var vm = new Vue({
    data: data
})

console.log(vm.a === data.a )// -> true

// 设置属性也会影响到原始数据
console.log(vm.a)
//vm.a = 2
//data.a
console.log(data.a)

// ... 反之亦然
//data.a = 3
//vm.a