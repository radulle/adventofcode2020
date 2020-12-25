console.time()
const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split(" -> "))

const board = new Map()

function g(val) {
  if (isNaN(Number(val))) {
    const calculated = board.get(val)()
    if (typeof calculated === "number") board.set(val, () => calculated)
    return calculated
  }
  return Number(val)
}

function int16(n) {
  return n & 0xffff
}

for (const [src, dest] of data) {
  const s = src.split(" ")
  if (s[0] === "NOT") {
    board.set(dest, () => int16(~g(s[1])))
    continue
  }
  if (s[1] === "AND") {
    board.set(dest, () => int16(g(s[0]) & g(s[2])))
    continue
  }
  if (s[1] === "OR") {
    board.set(dest, () => int16(g(s[0]) | g(s[2])))
    continue
  }
  if (s[1] === "LSHIFT") {
    board.set(dest, () => int16(g(s[0]) << g(s[2])))
    continue
  }
  if (s[1] === "RSHIFT") {
    board.set(dest, () => int16(g(s[0]) >> g(s[2])))
    continue
  }
  board.set(dest, () => g(s[0]))
}

const result = board.get("a")()

console.info("\nSolution:")
console.info(result, "\n")
console.timeEnd()
