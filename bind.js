/*
 * @Description: 手写bind
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 21:54:26
 * @LastEditTime: 2021-01-01 22:30:34
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