let userModel = function(options = {}) {
 return {
   getUsers: function() {},
   findUserById: function(){},
   limit: options.limit || 10
 }
}
let user = userModel()
console.log(user.limit)
let adminModel = (userModel) => {
  userModel.limit += 20
  userModel.removeUser = ()=> {}
  userModel.addUser = ()=>{}
  return userModel
}
console.log(adminModel(user).limit)