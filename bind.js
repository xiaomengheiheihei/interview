/*
 * @Description: 手写bind和自己实现call
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 21:54:26
 * @LastEditTime: 2021-01-03 17:56:03
 */

Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new Error(`myBind is function`)
  }

  // 调用方为目标函数，this指向目标函数
  let _this = this

  // 获取第二个以后的参数
  let args = Array.prototype.slice.call(arguments, 1)

  function TempFn () {}

  let fn = function () {
    // 当对fn使用new操作符时会改变其this指向，这里做判断
    return _this.apply(this instanceof TempFn ? this : context, args.concat(Array.prototype.slice.call(arguments, 1)))
  }

  // 将中间函数的原型指向目标函数
  TempFn.prototype = this.prototype

  // 利用原型继承改变this指向
  fn.prototype = new TempFn()

  return fn
}

function f () {
  console.log(this.name)
}

let obj = {
  name: 'Tom'
}

f = f.myBind(obj)

// f() // Tom

// 自己实现call
Function.prototype.call1 = function (context) {
	// 将要调用的方法指向要调用该方法的作用域
	context.fn = this;
	console.log(context.fn)
	var args = [];
	// 构造参数数组
	for (var i = 1; i < arguments.length; i++) {
		args.push('arguments[' + i + ']');
	}
	console.log(args);
	// 利用eval方法调用指定方法，通过字符串拼接将数组隐式的转化为字符串
	// context.fn(arguments[1],arguments[2])这样就只有第一个参数有效了，符合call用法
	eval('context.fn(' + args + ')');
	// 删除在该作用域定义的中间函数
	delete context.fn;
}
var obj = {
	name: 'tom'
}
function F (name) {
	console.log(name);
}

F.call1(this,obj.name);     // tom