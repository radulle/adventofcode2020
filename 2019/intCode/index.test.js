const fs = require("fs")
const intCode = require(".")

function parse(string) {
  return string.split(",").map(Number)
}

describe("IntCode computer", () => {
  describe("Opcode 5: jumps to second parameter if first is not 0", () => {
    it("output 0 if input 0, otherwise output 1", () => {
      const code = () => parse("3,3,1105,-1,9,1101,0,0,12,4,12,99,1")
      expect(intCode(code(), 0)).toEqual(0)
      expect(intCode(code(), 4)).toEqual(1)
    })
  })

  describe("Opcode 6: jumps to second parameter if first is 0", () => {
    it("output 0 if input 0, otherwise output 1", () => {
      const code = () => parse("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9")
      expect(intCode(code(), 0)).toEqual(0)
      expect(intCode(code(), 4)).toEqual(1)
    })
  })

  describe("simple code", () => {
    it.each([
      [8, 1],
      [2, 0],
      [42, 0],
    ])("returns 1 if input (%i) is 8 and 0 if not", (input, expected) => {
      expect(intCode(parse("3,9,8,9,10,9,4,9,99,-1,8"), input)).toEqual(
        expected
      )
      expect(intCode(parse("3,3,1108,-1,8,3,4,3,99"), input)).toEqual(expected)
    })
    it.each([
      [0, 1],
      [2, 1],
      [8, 0],
      [9, 0],
      [42, 0],
    ])(
      "returns 1 if input (%i) is less than 8 and 0 if not",
      (input, expected) => {
        expect(intCode(parse("3,9,7,9,10,9,4,9,99,-1,8"), input)).toEqual(
          expected
        )
        expect(intCode(parse("3,3,1107,-1,8,3,4,3,99"), input)).toEqual(
          expected
        )
      }
    )
  })

  describe("complex code", () => {
    const code = () =>
      parse(
        "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
      )

    it.each([0, 1, 2, 5, 7])(
      "returns 999 if input is less than 8 (%i)",
      (input) => {
        expect(intCode(code(), input)).toEqual(999)
      }
    )

    it("returns 1000 if input is 8", () => {
      expect(intCode(code(), 8)).toEqual(1000)
    })

    it.each([9, 10, 16, 21, 42, 1024])(
      "returns 1001 if input is greater than 8 (%i)",
      (input) => {
        expect(intCode(code(), input)).toEqual(1001)
      }
    )
  })

  describe("Task 2019/05", () => {
    const code = () =>
      fs
        .readFileSync(
          __dirname.split("\\").slice(0, -1).join("/") + "/05/data.txt",
          "utf8"
        )
        .split(",")
        .map(Number)
    it("05a: for input 1 output is 16489636", () => {
      expect(intCode(code(), 1)).toEqual(16489636)
    })
    it("05b: for input 5 output is 9386583", () => {
      expect(intCode(code(), 5)).toEqual(9386583)
    })
  })
})
