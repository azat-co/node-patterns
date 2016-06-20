
setImmediate(function A() {
  setImmediate(function B() {
    console.log('Step 1')
  })
  setImmediate(function C() {
    console.log('Step 2')
    setImmediate(function F() { console.log('Step 3') })
    setImmediate(function G() { console.log('Step 4') })
  })
})
console.log('Step 0')
setTimeout(function timeout() {
  console.log('Timeout!')
}, 0)
console.log('Step 0.5')
