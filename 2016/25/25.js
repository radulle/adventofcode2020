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
  let out = 0
  let outs = 0
  const maxOuts = 1024
  main: while (idx < program.length) {
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
      case "out":
        if (outs > maxOuts) return true
        if (out !== val(arg1)) return
        if (out === 0) {
          out = 1
        } else if (out === 1) {
          out = 0
        }
        outs++
        idx++
        break
    }
  }
  return register
}

let a = 0
while (true) {
  if (run({ a, b: 0, c: 0, d: 0 })) {
    break
  }
  a++
}
const resultA = a

console.info("\nSolution A:")
console.info(resultA)
console.timeEnd()
