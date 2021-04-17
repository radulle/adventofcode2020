const fs = require("fs")
console.time()

let count = 0

const program = [
  ...fs.readFileSync("data.txt", "utf8").matchAll(/(\D{3})\s(\w)\s(\S+)?$/gm),
]

function prog(register) {
  const get = (r) => (isNaN(r) ? reg[r] || 0 : Number(r))
  const set = (r, v) => (reg[r] = get(v))
  const reg = register || {}
  let i = 0
  while (i < program.length && i >= 0) {
    const [_, cmd, arg1, arg2] = program[i]
    switch (cmd) {
      case "set":
        set(arg1, arg2)
        i++
        break
      case "add":
        set(arg1, get(arg1) + get(arg2))
        i++
        break
      case "sub":
        set(arg1, get(arg1) - get(arg2))
        i++
        break
      case "mul":
        set(arg1, get(arg1) * get(arg2))
        count++
        i++
        break
      case "jnz":
        i += get(arg1) !== 0 ? get(arg2) : 1
        break
    }
  }
}

prog()

const resultA = count

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()
