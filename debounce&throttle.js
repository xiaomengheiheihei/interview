/*
 * @Description: 节流和防抖
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 13:15:52
 * @LastEditTime: 2021-01-01 14:08:14
 */

/**
 * 节流：
 * 原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，
 * 只有一次生效。
 * 场景：
 * 1. 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
 * 2. 缩放场景：监控浏览器resize
 */

function throttle(fn, delay=500) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay);
    }
  }
}

function  throttle1(fn, delay = 500) {
  let flag = true;
  return function (...args) {
    if(!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay);
  }
}
// const f = (name) => {
//   console.log(1111, name)
// }
// let f1 = throttle(f)

// setInterval(() => {
//   f1('tom')
// }, 100)

/**
 * 防抖：
 * 原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * 场景：
 * 1. 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
 * 2. 搜索框联想场景：防止联想发送请求，只发送最后一次输入
 */
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}