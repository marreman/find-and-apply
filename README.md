# find-and-apply

Recursively search any json structure and make changes at a certain leaf.

## Install
```sh
npm install find-and-apply
```

## Use
```js
const { findAndApply, isObject } = require("find-and-apply")

findAndApply([
  { foo: "bar" },
  { foo: "baz" }
], candidate => (
  isObject(candidate) && candidate.foo === "baz"
), hit => ({
  foo: "banana"
}))

// [{ foo: "bar" }, { foo: "banana" }]
```
