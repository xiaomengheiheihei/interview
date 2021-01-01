/*
 * @Description: 手写promis，基础版
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2020-12-03 11:02:17
 * @LastEditTime: 2020-12-25 14:53:52
 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
  constructor(fn) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolveCallBacks = []
    this.onRejectCallBacks = []

    let resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolveCallBacks.map(f => f())
      }
    }
  
    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectCallBacks.map(f => f())
      }
    }

    try {
      fn(resolve, reject)
    } catch(error) {
      reject(error)
    }
  }

  then(onFulilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      this.onRejectCallBacks.push(() => {
        onRejected(this.reason)
      })

      this.onResolveCallBacks.push(() => {
        onFulilled(this.value)
      })
    }
    
  }
}
