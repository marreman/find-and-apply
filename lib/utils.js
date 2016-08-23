module.exports.isObject = candidate =>
  Object.prototype.toString.call(candidate) === "[object Object]"

module.exports.isArray = candidate =>
  candidate instanceof Array

module.exports.clone = obj => JSON.parse(JSON.stringify(obj))


