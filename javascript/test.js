console.log(1)
setTimeout(() => {
  console.log(2)
})
setTimeout(() => {
  console.log(3)
}, 3000)
setTimeout(() => {
  console.log(4)
}, 2000)
Promise.resolve().then(() => {
  console.log(5)
})
console.log(6)
