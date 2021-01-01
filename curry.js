/*
 * @Description: 函数科里化， 对函数的一种转换，例如：
 * fn(a, b, c)可转化为fn(a)(b)(c)调用，本质上上一种函数转换
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2020-12-30 23:54:21
 * @LastEditTime: 2020-12-31 00:30:18
 */


function curry (fn) {
  return function(a) {
    return function(b) {
      return fn(a, b)
    }
  }
}

// 简单用法
function add(a, b) {
  console.log(a + b)
}

let adds = curry(add)

adds(3)(4)

// 高级写法和应用

function _curry(func) {
  return function curried (...args) {
    // 如果传入参数大于func定义参数说明参数已经一次性传入
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      // 传入参数小于func定义参数，分批次传入，
      // 返回偏函数：固定一些参数，产生更少参数的函数
      return function pass (...args1) {
        // 这时将参数组装起来调用
        return curried.apply(this, args.concat(args1))
      }
    }
  }
}

// 使用
function sum(a, b ,c) {
  console.log(a + b +c);
}

sum = _curry(sum)

// 参数随便传递
sum(1, 2 ,3)
sum(1)(2)(3)
sum(1)(2, 3)

// 实际场景，日志输出
function log(date, importance, message) {
  console.log(`date is ${date.getTime()},
  importance is ${importance}, message is ${message}`)
}

log = _curry(log)

let logNow = log(new Date())

let logBase = logNow('Base')

logBase('这是base test')




