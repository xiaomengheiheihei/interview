/*
 * @Description: 快排
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2020-12-25 14:54:37
 * @LastEditTime: 2020-12-30 13:03:28
 */

const quickSort = (target) => {
  if (target.length <= 0) return target
  let midIndex = Math.floor(target.length / 2),
    node = target.splice(midIndex, 1)[0],
    leftArr = [],
    rightArr = []
  for (let item of target) {
    item < node ? leftArr.push(item) : rightArr.push(item)
  }
  return quickSort(leftArr).concat([node], quickSort(rightArr))
}

var arr = [1, 4, 0, 23, 988, 22, 2, 5, 89, 33]

var res = quickSort(arr)


// js中所有参数传递都是值，不存在通过引用传参
var obj1 = {
  value: '111'
};

var obj2 = {
  value: '222'
};

function changeStuff(obj) {
  obj.value = '333';
  obj = obj2;
  return obj.value;
}

var foo = changeStuff(obj1);

console.log(foo);



