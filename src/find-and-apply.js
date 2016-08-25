const assert = require("assert")

const isObject = candidate =>
  Object.prototype.toString.call(candidate) === "[object Object]"

const isArray = candidate =>
  candidate instanceof Array

function findAndApply(obj, filter, transform) {
  assert(filter instanceof Function, "Second argument must be a function that is used to filter what you want")
  assert(transform instanceof Function, "Third argument must be a function that transform the objects that is filtered")

  var toVisit = []
  var toReturn

  if (isArray(obj)) {
    toReturn = obj.map(el => testAndQueue(el, filter, toVisit, transform))
  } else {
    toReturn = testAndQueue(obj, filter, toVisit, transform)
  }

  while (toVisit.length > 0) {
    var visiting = toVisit.pop()

    if (isObject(visiting)) {
      for (const key in visiting) {
        var nested = visiting[key]

        if (isArray(nested)) {
          visiting[key] = nested.map(el => testAndQueue(el, filter, toVisit, transform))
        } else {
          visiting[key] = testAndQueue(nested, filter, toVisit, transform)
        }
      }
    }
  }

  return toReturn
}

function testAndQueue(obj, filter, arr, transform) {
  if (filter(obj)) {
    obj = transform(obj)
  }

  arr.push(obj)
  return obj
}

module.exports = {
  findAndApply,
  isObject,
  isArray,
}
