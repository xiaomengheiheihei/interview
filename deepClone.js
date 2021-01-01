/*
 * @Description: 关于深拷贝和循环引用
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 02:20:18
 * @LastEditTime: 2021-01-01 11:47:13
 */

/**
 * @description: 判断目标是否为对象
 * @param {target} 
 * @return {true | false}
 */

function isObject(target) {
  return target !== null && typeof target === 'object';
}

function deepClone(target) {
  // 不是对象直接返回
  if (!isObject(target)) return target;
  // 判断数组
  let result = Array.isArray(target) ? [] : {}

  let keys = Object.keys(target)

  // 迭代目标对象的key来递归完成复制
  for(let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = deepClone(target[keys[i]])
  }
  
  return result
}

// 测试case
let obj = {
  a: 'name',
  b: {
    c: 1,
    d: 2
  },
  e: [1, 2, 3, 4],
  f: [{g: 1, h: 2}]
}

let o = deepClone(obj)
console.log(o)

/**
 * 上边代码存在无法解决循环应用和相同引用的问题
 */
// 循环引用
var a = {}, b = {}
a.b = b
b.a = a

console.log(deepClone(a)) // 堆栈溢出，因为递归会在两个对象之间无限运行

// 相同引用
var arr = [1,2,3]
var obj1 = {}
obj1.arr1 = arr
obj1.arr2 = arr

let r = deepClone(obj1) // 可以拷贝，但是改变了原有的对象指向

console.log(obj1.arr1 === obj1.arr2)  // true
console.log(r.arr1 === r.arr2)  // false

/**
 * @description: 解决相同引用和循环引用的深拷贝版本
 * @param {*}
 * @return {*}
 */

// 覆盖了上面的deepClone
function deepClone(target) {
  let visitedMap = new Map()
  function baseClone(target) {
    if (!isObject(target)) return target

    // 先获取map中是否存在当前target，如果存在则直接返回
    if (visitedMap.get(target)) return visitedMap.get(target)

    let result = Array.isArray(target) ? [] : {}

    visitedMap.set(target, result)

    let keys = Object.keys(target)

    for(let i = 0, len = keys.length; i < len; i++) {
      result[keys[i]] = baseClone(target[keys[i]])
    }

    return result
  }

  return baseClone(target)
}

