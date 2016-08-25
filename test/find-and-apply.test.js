const expect = require("expect")
const { findAndApply, isObject } = require("../src/find-and-apply")
const testData = require("./test-json-data")

describe("findAndApply()", () => {

  it("replace the value of name if found", () => {
    const data = {
      reference: 123,
      name: "unchanged"
    }

    const actual = findAndApply(data, c => c.reference === 123, obj => {
      return {
        reference: obj.reference,
        name: "changed"
      }
    })

    expect(actual).toEqual({
      reference: 123,
      name: "changed"
    })
  })

  it("should not replace the value of name if not found", () => {
    const data = {
      reference: 123,
      name: "unchanged"
    }

    const actual = findAndApply(data, c => c.reference === 12, obj => {
      return {
        reference: obj.reference,
        name: "changed"
      }
    })

    expect(actual.name).toEqual("unchanged")
  })

  it("should work on arrays", () => {
    const data = [{
      reference: 123,
      name: "unchanged"
    }, {
      reference: 12,
      name: "unchanged"
    }]

    const actual = findAndApply(data, c => c.reference === 12, obj => {
      return {
        reference: obj.reference,
        name: "changed"
      }
    })

    expect(actual).toEqual([{
      reference: 123,
      name: "unchanged"
    }, {
      reference: 12,
      name: "changed"
    }])
  })

  it("should just return if given a string", () => {
    expect(findAndApply("foo", c => null, () => {})).toEqual("foo")
  })

  it("should just return if given a number", () => {
    expect(findAndApply(1, _ => null, () => {})).toEqual(1)
  })

  it("should work nested objects", () => {
    const data = {
      a: {
        reference: 123,
        name: "unchanged"
      },
      b: {
        reference: 12,
        name: "unchanged"
      }
    }

    const actual = findAndApply(data, c => c.reference === 12, obj => {
      return {
        reference: obj.reference,
        name: "changed"
      }
    })

    expect(actual).toEqual({
      a: {
        reference: 123,
        name: "unchanged"
      },
      b: {
        reference: 12,
        name: "changed"
      }
    })
  })

  it("should work on real data", () => {
    const ref = "replace-me-now-pls"
    const actual = findAndApply(testData, c => {
      return isObject(c) && c.reference === ref
    }, obj => {
      return {
        reference: obj.reference,
        text: "foo"
      }
    })

    expect(actual[1].friends[0]).toEqual({
      reference: "replace-me-now-pls",
      text: "foo"
    })
  })

  it("should work deep complex json structures", () => {
    const data = {
      a: {
        c: {
          reference: 123,
          name: "unchanged"
        }
      },
      b: {
        g: [
          {
            reference: 12,
            name: "unchanged"
          }
        ]
      }
    }

    const actual = findAndApply(data, c => c.reference === 12, obj => {
      return {
        reference: obj.reference,
        name: "changed"
      }
    })

    expect(actual).toEqual({
      a: {
        c: {
          reference: 123,
          name: "unchanged"
        }
      },
      b: {
        g: [
          {
            reference: 12,
            name: "changed"
          }
        ]
      }
    })
  })

  it("should be blazlin fast", () => {
    const data = {}

    for (var i = 0; i < 10000; i++) {
      data[i] = {}
      var nested = data[i]

      for (var j = 0; j < 100; j++) {
        nested[j] = {}
        nested = nested[j]
      }
    }

    // Only tests the speed
    const actual = findAndApply(data, c => c.reference == "dummy", obj => {
      return {
      }
    })
  })

  describe("faulty function arguments", () => {
    it("should throw if not given a function as its third argument", () => {
      expect(() => {
        findAndApply({}, () => {}, undefined)
      }).toThrow()
    })

    it("should throw if not given a function as its second argument", () => {
      expect(() => {
        findAndApply({}, undefined, () => {})
      }).toThrow()
    })
  })
})

