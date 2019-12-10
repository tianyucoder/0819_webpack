/*
* ES6模块化语法：
*   暴露：分别暴露、统一暴露、默认暴露
*   引入：import {} from xxxx    import xxxx from xxxx
* */

//用分别暴露的方式，暴露一个加法函数
export function sum(a,b) {
  return a+b
}