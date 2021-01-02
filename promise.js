/*
 * @Description: 手写promis，基础版
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2020-12-03 11:02:17
 * @LastEditTime: 2021-01-02 12:48:03
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

/**
 * @description: 手写promiseall
 * @param {promises promise组成的数组}
 * @return {*}
 */

Promise.prototype.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = [],
        count = 0;
    const resultByKeys = (value, index) => {
      result[index] = value
      if (++count === promises.length) {
        resolve(result)
      }
    }

    promises.forEach((promise, index) => {
      promise.then(value => {
        resultByKeys(value, index)
      }, reject)
    });
  })
}