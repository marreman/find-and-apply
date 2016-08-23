const { isObject, isArray, clone } = require("./utils")

module.exports = function replace(obj, ref, fn) {
  if (isObject(obj) && obj.reference === ref) {
    return fn(clone(obj))
  }

  if (isArray(obj)) {
    return obj.map(el => replace(el, ref, fn))
  }

  if (isObject(obj)) {
    for (const key in obj) {
      obj[key] = replace(obj[key], ref, fn)
    }

    return obj
  }

  return obj
}
