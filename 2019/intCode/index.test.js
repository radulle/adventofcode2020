const fs = require("fs")
const intCode = require(".")

function parse(string) {
  return string.split(",").map(Number)
}

describe("IntCode computer", () => {
  describe("Task 2019/05", () => {
    describe("Tests", () => {
      describe("05b: (opcode 5) jumps to second parameter if first is not 0", () => {
        it("output 0 if input 0, otherwise output 1", () => {
          const code = () => parse("3,3,1105,-1,9,1101,0,0,12,4,12,99,1")
          expect(intCode.eval(code(), [0])).toEqual(0)
          expect(intCode.eval(code(), [4])).toEqual(1)
        })
      })

      describe("05b: (opcode 6) jumps to second parameter if first is 0", () => {
        it("output 0 if input 0, otherwise output 1", () => {
          const code = () => parse("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9")
          expect(intCode.eval(code(), [0])).toEqual(0)
          expect(intCode.eval(code(), [4])).toEqual(1)
        })
      })

      it.each([
        [8, 1],
        [2, 0],
        [42, 0],
      ])(
        "05b: returns 1 if input (%i) is 8 and 0 if not",
        (input, expected) => {
          expect(
            intCode.eval(parse("3,9,8,9,10,9,4,9,99,-1,8"), [input])
          ).toEqual(expected)
          expect(
            intCode.eval(parse("3,3,1108,-1,8,3,4,3,99"), [input])
          ).toEqual(expected)
        }
      )
      it.each([
        [0, 1],
        [2, 1],
        [8, 0],
        [9, 0],
        [42, 0],
      ])(
        "05b: returns 1 if input (%i) is less than 8 and 0 if not",
        (input, expected) => {
          expect(
            intCode.eval(parse("3,9,7,9,10,9,4,9,99,-1,8"), [input])
          ).toEqual(expected)
          expect(
            intCode.eval(parse("3,3,1107,-1,8,3,4,3,99"), [input])
          ).toEqual(expected)
        }
      )
      describe("05b: larger example", () => {
        const code = () =>
          parse(
            "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
          )

        it.each([0, 1, 2, 5, 7])(
          "returns 999 if input is less than 8 (%i)",
          (input) => {
            expect(intCode.eval(code(), [input])).toEqual(999)
          }
        )

        it("returns 1000 if input is 8", () => {
          expect(intCode.eval(code(), [8])).toEqual(1000)
        })

        it.each([9, 10, 16, 21, 42, 1024])(
          "returns 1001 if input is greater than 8 (%i)",
          (input) => {
            expect(intCode.eval(code(), [input])).toEqual(1001)
          }
        )
      })
    })
    describe("Tasks", () => {
      const code = () =>
        fs
          .readFileSync(
            __dirname.split("\\").slice(0, -1).join("/") + "/05/data.txt",
            "utf8"
          )
          .split(",")
          .map(Number)
      it("05a: for input 1 output is 16489636", () => {
        expect(intCode.eval(code(), [1])).toEqual(16489636)
      })
      it("05b: for input 5 output is 9386583", () => {
        expect(intCode.eval(code(), [5])).toEqual(9386583)
      })
    })
  })

  describe("Task 2019/07", () => {
    describe("Tests", () => {
      it.each([
        [
          43210,
          "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
          [4, 3, 2, 1, 0],
        ],
        [
          54321,
          "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
          [0, 1, 2, 3, 4],
        ],
        [
          65210,
          "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
          [1, 0, 4, 3, 2],
        ],
      ])(
        "07a: Max thruster signal is %i",
        (maxThrusterSignal, program, phaseSettingSequence) => {
          expect(
            intCode.amplifiers(() => parse(program), phaseSettingSequence, [0])
          ).toEqual(maxThrusterSignal)
        }
      )

      it.each([
        [
          139629729,
          "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
          [9, 8, 7, 6, 5],
        ],
        [
          18216,
          "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10",
          [9, 7, 8, 5, 6],
        ],
      ])(
        "07b: Looping amplifiers, max thruster signal is %i",
        (maxThrusterSignal, program, phaseSettingSequence) => {
          expect(
            intCode.amplifiers(() => parse(program), phaseSettingSequence, [0])
          ).toEqual(maxThrusterSignal)
        }
      )
    })
  })
})
