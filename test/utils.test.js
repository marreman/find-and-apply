const expect = require("expect")
const { isObject, isArray, clone } = require("../lib/utils")

describe("clone()", () => {
  it("should return an object strictly different from the given one", () => {
    const expected = { a: "haj" }
    const actual = clone(expected)

    expect(actual).toNotBe(expected)
  })
})

describe("isObject()", () => {
  it("should return true if given an plain object", () => {
    expect(isObject({})).toBe(true)
  })

  it("should return false if given an array", () => {
    expect(isObject([])).toBe(false)
  })

  it("should return false if given a string", () => {
    expect(isObject("123")).toBe(false)
  })

  it("should return false if given a number", () => {
    expect(isObject(123)).toBe(false)
  })

  it("should return false if given a boolean", () => {
    expect(isObject(true)).toBe(false)
  })
})

describe("isArray()", () => {
  it("should return true if given an array", () => {
    expect(isArray([])).toBe(true)
  })

  it("should return false if given an plain object", () => {
    expect(isArray({})).toBe(false)
  })

  it("should return false if given a string", () => {
    expect(isArray("123")).toBe(false)
  })

  it("should return false if given a number", () => {
    expect(isArray(123)).toBe(false)
  })

  it("should return false if given a boolean", () => {
    expect(isArray(true)).toBe(false)
  })
})
