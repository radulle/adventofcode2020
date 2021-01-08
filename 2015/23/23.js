const fs = require("fs")
console.time()

const program = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split(/ |, /g))

function run() {
  while (i < program.length) {
    const [cmd, arg1, arg2] = program[i]
    switch (cmd) {
      case "hlf":
        register[arg1] /= 2
        i++
        break
      case "tpl":
        register[arg1] *= 3
        i++
        break
      case "inc":
        register[arg1]++
        i++
        break
      case "jmp":
        i += Number(arg1)
        break
      case "jie":
        if (Number(register[arg1]) % 2 === 0) {
          i += Number(arg2)
        } else {
          i++
        }
        break
      case "jio":
        if (Number(register[arg1]) === 1) {
          i += Number(arg2)
        } else {
          i++
        }
        break
    }
  }
}

const register = { a: 0, b: 0 }
let i = 0
run()
const resultA = register.b

register.a = 1
register.b = 0
i = 0
run()
const resultB = register.b

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
