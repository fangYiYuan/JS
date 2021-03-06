let arr = [1, 2, 3]
let obj = {name: 'alex', age: 10, like: {name: 'yyyy'}}

// 数组的浅拷贝
// concat
// let arr1 = arr.concat()

// Array.from
// let arr1 = Array.from(arr)

// Array.slice()
// let arr1 = arr.slice()
// arr1[0] = 4
// console.log('=>', arr)
// console.log('=>', arr1)
/* 
=> [ 1, 2, 3 ]
=> [ 4, 2, 3 ]
*/

//Object.assign 实现对象的浅拷贝
// obj2 = Object.assign({}, obj)
// obj2.name = 'fang'
// obj2.like.name = 'ooooo'
// console.log('=>', obj)
// console.log('=>', obj2)

// arr = [1, 2, {color: 'red'}, [9]]
// function copy(obj) {
//   if(typeof obj !== 'object') return
//   let pre = Array.isArray(obj) ? [] : {}
//   for (let i in obj) {
//     if (typeof obj[i] === 'object') {
//       pre[i] = copy(obj[i])
//     } else {
//       pre[i] = obj[i]
//     }
//   }
//   return pre
// }
// let obj2 = copy(arr)
function copy2(data) {
  if (typeof data !== 'object') return
  let sub = Array.isArray(data) ? [] : {}
  for(let [k, v] of Object.entries(data)) {
     if (typeof v === 'object') {
      sub[k] = copy2(v)
    } else {
      sub[k] = v
    }
  }
  return sub
}
let c2 = copy2(obj)
console.log('=>obj', obj)
c2.name = 'yiyuan'
c2.like.age = 20
console.log('=>c2', c2)
// obj2[2].color = 'yellow'
// obj2[3][0] = 0
// console.log('=>', arr)
// console.log('=>', obj2)
