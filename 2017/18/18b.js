const fs = require("fs")
console.time()

const count = [0, 0]

const program = [
  ...fs.readFileSync("data.txt", "utf8").matchAll(/(\D{3})\s(\w)\s(\S+)?$/gm),
]

function* prog(p) {
  const get = (r) => (isNaN(r) ? reg[r] || 0 : Number(r))
  const set = (r, v) => (reg[r] = get(v))
  const que = []
  const reg = { p }
  let i = 0
  const quePush = (el) => el !== undefined && el !== null && que.push(el)
  quePush(yield null)
  while (i < program.length && i >= 0) {
    const [_, cmd, arg1, arg2] = program[i]
    switch (cmd) {
      case "snd":
        {
          count[p]++
          quePush(yield get(arg1))
        }
        i++
        break
      case "rcv":
        {
          while (!que.length && !quePush(yield)) {}
          set(arg1, que.shift())
        }
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
      case "jgz":
        i += get(arg1) > 0 ? get(arg2) : 1
        break
    }
  }
}

const prog0 = prog(0)
const prog1 = prog(1)

let a, b
do {
  b = prog1.next(a?.value)
  a = prog0.next(b?.value)
} while (!(a?.value === undefined && b?.value === undefined))
const resultB = count[1]

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
