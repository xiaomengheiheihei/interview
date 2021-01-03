/*
 * @Description: 斐波那契数列
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-02 00:05:13
 * @LastEditTime: 2021-01-02 22:10:13
 */
// 1、1、2、3、5、8、13、21、34
// F(n) = F(n-1) + F(n-2)
function fibonacci(n) {
  if (n <= 1) return n
  console.log(n)
  return fibonacci(n -1) + fibonacci(n - 2)
}

// 尾递归调用
function fibonacci(n, n1, n2) {
  if(n <= 1) {
      return n2
  }
  return fibonacci(n - 1, n2, n1 + n2)
}

// 动态规划方案
// 输入正整数n，输出0，1，1，2，3，5，8，13...
// 第三个数为前两数之和
// 思路：
// 避免n为最前两位的情况，也就是0，1
// 构造一个数组存储输出的list，全部初始化为0
// 依次对指定位置赋值
function dynFib (n) {
  if (n === 0) {
      return 0;
  }
  if (n <= 2) {
      return 1;
  }
  let rs = [];
  for (let i = 0; i <= n; i++) {
      rs[i] = 0;
  }
  rs[1] = 1;
  rs[2] = 1;
  for (let i = 3; i <= n; i++) {
      rs[i] = rs[i - 1] + rs[i - 2];
  }
  return rs;
}
console.log(dynFib(10))
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]