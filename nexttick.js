
process.nextTick(function A() {
  process.nextTick(function B() {
    console.log('Step 1')
  })
  process.nextTick(function C() {
    console.log('Step 2')
    process.nextTick(function F() { console.log('Step 3') })
    process.nextTick(function G() { console.log('Step 4') })
  })
})

setTimeout(function timeout() {
  console.log('Timeout!')
}, 0)
