Object.prototype.toPrettyJSON = function() {
  console.log(this)
  return JSON.stringify(this, null, 2)
}
let obj = new Object({a: 1})
console.log(obj.toPrettyJSON())