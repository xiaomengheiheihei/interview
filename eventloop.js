/*
 * @Description: 事件循环
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-01 11:58:06
 * @LastEditTime: 2021-01-01 12:04:50
 */
// 宏任务列表：I/O setTimeout setInterval setImmediate（nodejs） 
// requestAnimationFrame

// 微任务列表：process.nextTick	MutationObserver Promise.then catch finally

// 执行顺序 宏任务 ==》当前宏任务对应的微任务 ==》 下一个宏任务 ===》 对应微任务

// 可以用作拆分CPU过载任务