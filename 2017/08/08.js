const fs = require("fs")
console.time()

const test = (operator, operand) => (regCompare) => {
  switch (operator) {
    case ">":
      return regCompare > operand
    case ">=":
      return regCompare >= operand
    case "<":
      return regCompare < operand
    case "<=":
      return regCompare <= operand
    case "==":
      return regCompare === operand
    case "!=":
      return regCompare !== operand
  }
}

const register = new Map()
let max = 0

const data = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/(\w+) (\w+) (-?\d+) if (\w+) (\S+) (-?\d+)/g),
].map(([_, regA, dec, amt, regB, operator, operand]) => ({
  regA,
  modA: amt * (dec === "dec" ? -1 : 1),
  regB,
  condition: test(operator, Number(operand)),
}))

data.forEach(({ regA, modA, condition, regB }) => {
  if (condition(register.get(regB) || 0)) {
    register.set(regA, (register.get(regA) || 0) + modA)
    max = Math.max(max, register.get(regA))
  }
})

const resultA = Math.max(...register.values())
const resultB = max

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
