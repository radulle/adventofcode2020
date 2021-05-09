const fs = require("fs")
const OpCode = require("../opcode")
console.time()

const file = fs.readFileSync("data.txt", "utf8").split(/(?:\r?\n){4}/)

function compare(A, B) {
  if (A.length !== B.length) return false
  for (let i = 0; i < A.length; i++) {
    if (A[i] !== B[i]) return false
  }
  return true
}
function parse(str, spl = ", ") {
  return str.trim().split(spl).map(Number)
}
const buckets = new Map()
const oc = new OpCode()
let resultA = 0
for (const match of file[0].matchAll(
  /Before: \[(.+)\]\r?\n(.+)\r?\nAfter:  \[(.+)\]/g
)) {
  let count = 0
  const input = parse(match[1])
  const instruction = parse(match[2], " ")
  const output = parse(match[3])
  for (const op of Object.values(oc.op)) {
    oc.register = [...input]
    op(...instruction.slice(1))
    if (compare(oc.register, output)) {
      if (!buckets.has(op)) buckets.set(op, new Set())
      buckets.get(op).add(instruction[0])
      count++
    }
  }
  if (count > 2) resultA++
}

const map = new Map()
while (buckets.size) {
  for (const [key, val] of buckets.entries()) {
    if (val.size === 1) {
      const value = [...val][0]
      map.set(value, key)
      buckets.delete(key)
      for (const s of buckets.values()) {
        s.delete(value)
      }
    }
  }
}

oc.map = map

oc.register = [0, 0, 0, 0]

for (const raw of file[1].split(/\r?\n/)) {
  const [code, ...args] = raw.split(" ").map(Number)
  oc.map.get(code)(...args)
}

const resultB = oc.register[0]

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
