/*
* 该文件是汇总所有js模块的
* */
import {sum} from './module1'
import {sub} from './module2'
import module3 from './module3'

console.log(sum(1, 2));
console.log(sub(3, 4));
console.log(module3.mul(5,6));
console.log(module3.div(10,2));

setTimeout(()=>{
  console.log(1)
},1000)