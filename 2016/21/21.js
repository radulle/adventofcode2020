const fs = require("fs")
const { LinkedListDoubleCircular } = require("lib")
console.time()

class Code extends LinkedListDoubleCircular {}

const program = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")

function run(password, program, { debug, inverse } = {}) {
  const code = new Code()
  const map = new Map()
  for (const char of password.split("")) {
    code.append(char)
  }
  let cur = code.first
  do {
    map.set(cur.id, cur)
    cur = cur.next
  } while (cur.id !== code.first.id)

  let match
  for (const line of program) {
    if (debug) console.info(code.toString())

    if (
      (match = /swap (letter|position) (.) with (?:letter|position) (.)/.exec(
        line
      ))
    ) {
      let [, s, a, b] = match
      let A, B
      if (s === "letter") {
        A = map.get(a)
        B = map.get(b)
      } else {
        A = code.getByPos(+a)
        B = code.getByPos(+b)
      }
      code.swap(A, B)
      continue
    }

    if ((match = /rotate (left|right) (.) step/.exec(line))) {
      const [, dir, steps] = match
      for (let i = 0; i < steps; i++) {
        code.first = (inverse ? dir === "left" : dir === "right")
          ? code.first.prev
          : code.first.next
      }
      continue
    }

    if ((match = /rotate based on position of letter (.)/.exec(line))) {
      const [, letter] = match
      cur = code.first
      let steps = 0
      while (cur.id !== letter) {
        cur = cur.next
        steps++
      }
      if (!inverse) {
        if (steps > 3) steps++
        steps++
        for (let i = 0; i < steps; i++) {
          code.first = code.first.prev
        }
      } else {
        const invSteps = [9, 1, 6, 2, 7, 3, 8, 4]
        for (let i = 0; i < invSteps[steps]; i++) {
          code.first = code.first.next
        }
      }
      continue
    }

    if ((match = /reverse positions (.) through (.)/.exec(line))) {
      let t
      const [, a, b] = match
      let A = code.getByPos(+a)
      let B = code.getByPos(+b)
      code.swap(A, B)
      for (let i = 0; i < Math.floor((b - a) / 2); i++) {
        t = A
        A = B.next
        B = t.prev
        code.swap(A, B)
      }
      continue
    }

    if ((match = /move position (.) to position (.)/.exec(line))) {
      let t,
        [, a, b] = match
      if (inverse) {
        t = a
        a = b
        b = t
      }
      let A = code.getByPos(+a)
      code.removeNode(A)
      let B = code.getByPos(+b)
      B.prev.next = A
      A.prev = B.prev
      B.prev = A
      A.next = B
      if (+b === 0) code.first = A
      continue
    }
  }

  return code.toString()
}

const resultA = run("abcdefgh", program)
const resultB = run("fbgdceah", program.reverse(), {
  inverse: true,
})

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
