const fs = require("fs")
const OpCode = require("../opcode")
console.time()

const file = fs.readFileSync("data.txt", "utf8").split(/\r?\n/)
const ip = +file.shift().replace("#ip ", "")
const prog = file.map((line) =>
  line.split(" ").map((e, i) => (i === 0 ? e : +e))
)
const len = prog.length

// only way to halt is for line 28 eqrr to be true
const cache = []
function run(O = 0, debug = false) {
  const oc = new OpCode(6)
  oc.register[0] = O
  const line = () => oc.register[ip]
  while (line() < len) {
    const [op, ...args] = prog[line()]
    if (line() === 28) {
      const cur = oc.register[4]
      if (cache.includes(cur)) {
        break
      }
      cache.push(cur)
    }
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

run()

const resultA = cache[0]
const resultB = cache[cache.length - 1]

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:\n")
console.info(resultB, "\n")
console.timeEnd()
