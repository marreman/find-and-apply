const assert = require("assert")
const _ = require("lodash/fp")

const isObject = candidate =>
  Object.prototype.toString.call(candidate) === "[object Object]"

const isArray = candidate =>
  candidate instanceof Array

const findAndApply = _.curry((filter, transform, obj) => {
  assert(filter instanceof Function, "Second argument must be a function that is used to filter what you want")
  assert(transform instanceof Function, "Third argument must be a function that transform the objects that is filtered")

  if (filter(obj)) {
    obj = transform(obj)
  }

  if (isArray(obj)) {
    return obj.map(el => findAndApply(filter, transform, el))
  }

  if (isObject(obj)) {
    for (const key in obj) {
      obj[key] = findAndApply(filter, transform, obj[key])
    }

    return obj
  }

  return obj
})

module.exports = {
  findAndApply,
  isObject,
  isArray,
}
