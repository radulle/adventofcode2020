const fs = require("fs")
console.time()

const program = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split(" "))

const subst = {
  cpy: "jnz",
  inc: "dec",
  dec: "inc",
  jnz: "cpy",
  tgl: "inc",
}

function run(register) {
  const val = (arg) => (isNaN(+arg) ? register[arg] : +arg)
  let idx = 0
  while (idx < program.length) {
    const [cmd, arg1, arg2] = program[idx]
    switch (cmd) {
      case "cpy":
        register[arg2] = val(arg1)
        idx++
        break
      case "inc":
        register[arg1]++
        idx++
        break
      case "dec":
        register[arg1]--
        idx++
        break
      case "jnz":
        if (val(arg1) !== 0) {
          idx += val(arg2)
        } else {
          idx++
        }
        break
      case "tgl":
        const step = val(arg1)
        if (step + idx >= 0 && step + idx < program.length) {
          program[step + idx][0] = subst[program[step + idx][0]]
        }
        idx++
        break
      default:
        idx++
    }
  }
  return register
}

const resultB = run({ a: 12, b: 0, c: 0, d: 0 }).a

console.info("\nSolution B:")
console.info(resultB)
console.timeEnd()
