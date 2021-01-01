/*
 * @Description: 浏览器事件和nodejs的eventEmitter类
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 00:42:24
 * @LastEditTime: 2021-01-01 02:08:37
 */

/**
 * 浏览器事件对象
 * 事件冒泡：事件会随着dom层级向上延展，这里可以定义事件委托
 * 事件捕获：捕获阶段和冒泡阶段相反
 */

/**
 * eventEmitter类，eventEmitter是nodejs的事件模型
 * 不管是浏览器事件模型还是eventEmitter类都是观察者模式的最好践行者
 * 这里有几个关键的概念
 * 1. subscribes一个数组用来保存订阅
 * 2. subscribe()方法用来添加订阅
 * 3. unsubscribe()取消订阅
 * 4. publish()用来调用调阅
 */ 
// 简单的例子
const test = {
  subscribes: {},
  // 添加订阅
  subscribe(type, fn) {
    if (!this.subscribes[type]) {
      this.subscribes[type] = []
    }
    this.subscribes[type].push(fn)
  },
  // 取消订阅
  unsubscribe(type, fn) {
    this.subscribes[type] =
    this.subscribes[type].filter(i => i !== fn)
  },
  // 发布订阅
  publish(type, ...args) {
    this.subscribes[type].forEach(item => {
      item(...args)
    });
  }
}

// 以上是一个简单的订阅器，下面则由test1去订阅他
const test1 = {
  sayHi(name) {
    console.log(`Hi ${name}`)
  }
}

test.subscribe('type1', test1.sayHi)
test.subscribe('type2', test1.sayHi)

// 发布
test.publish('type1', 'Tom')
test.publish('type2', 'Jack')

/**
 * 不难想象将上边的例子中一些方法换成
 * 我们熟知的on，off和emit就是我们最基础的事件模型了
 * 下边是事件模型实现
 */

class MyEventEmitter {
  constructor() {
    this._events = {}
  }

  // 订阅实现
  on(type, fn) {
    if (!this._events[type]) this._events[type] = []
    this._events[type].push(fn)
  }

  // 多个flag参数
  addListener(type, fn, flag) {
    if (!this._events[type]) {
      this._events[type] = []
    } else {
      // 判断addListener的flag
      flag ? this._events[type].unshift(fn) : this._events[type].push(fn)
    }
  }

  // emit触发
  emit(type, ...args) {
    this._events[type] &&
    this._events[type].forEach(fn => fn.call(this, ...args))
  }

  // once方法，仅触发一次
  once(type, fn) {
    const only = (...args) => {
      fn(...args)
      this.off(type, only)
    }

    only.origin = fn
    this.on(type, only)
  }

  // 取消订阅
  off(type, fn) {
    this._events[type] =
    this._events[type].filter(f => f !== fn && f !== fn.origin)
  }

}

let ev = new MyEventEmitter()
const listener = (name, name1) => {
  console.log(`Hello ${name} ${name1}`)
}
ev.on('type', listener)

ev.once('type1', listener)

ev.emit('type', 'Tom', 'Jack')
ev.emit('type1', 'Carlos', 'ergouzi')