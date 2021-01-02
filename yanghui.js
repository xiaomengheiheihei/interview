/*
 * @Description: 输出杨辉三角的第n行m位的数字
 * @Author: carlos
 * @E-mail: xiaoshuangogo@163.com
 * @Date: 2021-01-02 00:30:02
 * @LastEditTime: 2021-01-02 00:32:01
 */

function findNum(n,m) {
　if(m > n){
　　return false;
　}
　if(m==1 || m==n){
　　return 1;
　}
　if(m==2 || m==n-1){
　　return n-1;
　}
　return findNum(n-1,m) + findNum(n-1,m-1);
}