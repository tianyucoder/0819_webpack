/*
* webpack的入口文件（所有要用的文件（模块），都需要在此引入）
* */
import {sum} from './module1'
import {sub} from './module2'
import module3 from './module3'
import data from '../json/test.json'
import  '../css/index.less'
import  '../css/iconfont.less'
import '@babel/polyfill'

console.log(sum(1, 2));
console.log(sub(3, 4));
console.log(module3.mul(5,6));
console.log(module3.div(10,2));
console.log(data)


console.log(1 == 4)

new Promise((resolve)=>{
  setTimeout(()=>{
    resolve(1)
  },1000)
}).then(
  value => console.log(value)
)