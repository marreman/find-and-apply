const assert = require("assert")

const isObject = candidate =>
  Object.prototype.toString.call(candidate) === "[object Object]"

const isArray = candidate =>
  candidate instanceof Array

function findAndApply(obj, filter, transform) {
  assert(filter instanceof Function, "Second argument must be a function that is used to filter what you want")
  assert(transform instanceof Function, "Third argument must be a function that transform the objects that is filtered")

  if (filter(obj)) {
    return transform(obj)
  }

  if (isArray(obj)) {
    return obj.map(el => findAndApply(el, filter, transform))
  }

  if (isObject(obj)) {
    for (const key in obj) {
      obj[key] = findAndApply(obj[key], filter, transform)
    }

    return obj
  }

  return obj
}

module.exports = {
  findAndApply,
  isObject,
  isArray,
}
