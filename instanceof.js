/*
 * @Description: instanceof原理和自己实现
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 11:48:19
 * @LastEditTime: 2021-01-01 11:54:39
 */

function People (name) {
  this.name = name;
  this.say = function () {
      console.log(this.name)
  };
}

var p = new People('hh');
console.log(p instanceof People)    // true
console.log(p.__proto__ === People.prototype)   // true

/**
 * 其执行原理就是向上查找p的原型链，也就是p__proto__指向其构造函数的原型，
 * 看其构造函数中的原型对象是否是People，是则返回true，否则返回false。
 * 实例的__proto__包含其构造函数的原型对象prototype
 * 实例的constructor指向其构造函数
 * 实例的原型对象prototype在未指定时为undefined
 * 函数的原型对象包含其constructor和__proto__
 */