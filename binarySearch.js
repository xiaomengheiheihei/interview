/*
 * @Description: 二分查找
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2020-12-30 13:03:17
 * @LastEditTime: 2020-12-30 13:28:11
 */

// 二分查找，非递归形式。条件：arr为有序数组

function binarySearch (arr, target) {
  let end = arr.length - 1,
      start = 0;
  
  while(start <= end) {
    // 取中间数
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    // 当查找数字大于中间数时取mid + 1为start
    target > arr[mid] ? start += mid : end -= mid
  }

  // 查找失败返回false
  return false
}

let arr = [-23, 2, 45, 87, 199, 399, 400, 500]

binarySearch(arr, 87)

// 二分查找：递归形式

function recursionBinarySearch (arr, target, start = 0, end) {
  if (end === undefined) end = arr.length - 1;
  // 设置默认值防止调用开始参数问题 
  let mid = Math.floor((start + end) / 2);
  
  if (arr[mid] === target) return mid;
  
  if (start >= end) return false;

  return arr[mid] < target ? recursionBinarySearch(arr, target, mid + 1, end) :
  recursionBinarySearch(arr, target, start, mid - 1);
}

let arr1 = [-200, 1, 29, 33, 38, 100, 299]

let res = recursionBinarySearch(arr1, 100)
console.log(res)
