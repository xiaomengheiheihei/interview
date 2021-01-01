/*
 * @Description: vue.$set原理
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 14:11:24
 * @LastEditTime: 2021-01-01 14:27:02
 */

/**
 * 当 target 为数组时，直接调用数组方法 splice 实现；
 * 如果目标是对象，会先判读属性是否存在、对象是否是响应式
 * 最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理
 * defineReactive 方法就是 Vue 在初始化对象时，
 * 给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法
 */