const fs = require("fs")
const lib = require("lib")
console.time()

const str = "abcdefghijklmnop"
let progs = str.split("")

const data = fs.readFileSync("data.txt", "utf8").split(",")

const play = () => {
  for (const inst of data) {
    switch (inst[0]) {
      case "p":
        {
          const A = inst[1]
          const B = inst[3]
          const iA = progs.findIndex((c) => c === A)
          const iB = progs.findIndex((c) => c === B)
          progs[iA] = B
          progs[iB] = A
        }
        break
      case "x":
        {
          const [iA, iB] = inst.slice(1).split("/").map(Number)
          const A = progs[iA]
          progs[iA] = progs[iB]
          progs[iB] = A
        }
        break
      case "s":
        const n = Number(inst.slice(1))
        progs = [...progs.slice(-n), ...progs.slice(0, progs.length - n)]
        break
    }
  }
  return progs.join("")
}

const perms = [play()]
while (perms[perms.length - 1] !== str) {
  perms.push(play())
}

let resultA = perms[0]
let resultB = perms[(1_000_000_000 % perms.length) - 1]

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
