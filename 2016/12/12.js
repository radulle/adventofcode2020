const fs = require("fs")
console.time()

const program = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split(" "))

function run(register) {
  let i = 0
  while (i < program.length) {
    const [cmd, arg1, arg2] = program[i]
    switch (cmd) {
      case "cpy":
        register[arg2] = isNaN(+arg1) ? register[arg1] : arg1
        i++
        break
      case "inc":
        register[arg1]++
        i++
        break
      case "dec":
        register[arg1]--
        i++
        break
      case "jnz":
        if (register[arg1] !== 0) {
          i += +arg2
        } else {
          i++
        }
        break
    }
  }
  return register
}

const resultA = run({ a: 0, b: 0, c: 0, d: 0 }).a
const resultB = run({ a: 0, b: 0, c: 1, d: 0 }).a

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
