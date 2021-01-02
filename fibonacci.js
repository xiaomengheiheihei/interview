/*
 * @Description: 斐波那契数列
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-02 00:05:13
 * @LastEditTime: 2021-01-02 00:29:18
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
