const fs = require("fs")
console.time()

const program = [
  ...fs.readFileSync("data.txt", "utf8").matchAll(/(\D{3})\s(\w)\s(\S+)?$/gm),
]

function run() {
  const reg = {}
  const get = (r) => (isNaN(r) ? reg[r] || 0 : +r)
  const set = (r, v) => (reg[r] = get(v))
  let i = 0
  let rcv
  while (i < program.length && i >= 0) {
    const [_, cmd, arg1, arg2] = program[i]
    switch (cmd) {
      case "snd":
        rcv = get(arg1)
        i++
        break
      case "set":
        set(arg1, arg2)
        i++
        break
      case "add":
        set(arg1, get(arg1) + get(arg2))
        i++
        break
      case "mul":
        set(arg1, get(arg1) * get(arg2))
        i++
        break
      case "mod":
        set(arg1, get(arg1) % get(arg2))
        i++
        break
      case "rcv":
        if (get(arg1)) return rcv
        get(arg1) && set(arg1, rcv)
        i++
        break
      case "jgz":
        i += get(arg1) > 0 ? +get(arg2) : 1
        break
    }
  }
  return rcv
}

const resultA = run()

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()
