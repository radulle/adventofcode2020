const fs = require("fs")
const OpCode = require("../opcode")
console.time()

const file = fs.readFileSync("data.txt", "utf8").split(/\r?\n/)
const ip = +file.shift().replace("#ip ", "")
const prog = file.map((line) =>
  line.split(" ").map((e, i) => (i === 0 ? e : +e))
)
const len = prog.length

function run(O = 0, debug = false) {
  const oc = new OpCode(6)
  oc.register[0] = O
  const line = () => oc.register[ip]
  while (line() < len) {
    const [op, ...args] = prog[line()]
    oc.op[op](...args)
    oc.register[ip]++
    if (debug)
      fs.appendFileSync(
        "debug.log",
        "\n" + JSON.stringify([op, args, oc.register])
      )
  }
  return oc.register[0]
}

const resultA = run()

// run(1, true)
/**
 * generate big number 10551358 (2nd half)
 * sum of factors
 * 1 + 2 + 5275679 + 10551358
 * repeats lines 3 to 15 (1st half)
 * (most time spent in 3 to 11)
 */
let a = 0,
  d = 10551358,
  e = 1
while (d >= e) {
  if (!(d % e)) {
    a += e
  }
  e++
}
const resultB = a

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
debugger
