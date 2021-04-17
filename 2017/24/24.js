const fs = require("fs")
console.time()

const allComponents = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((row) => row.split("/").map(Number))

let strength = 0
let length = 0
let strengthB = 0

function dfs(port, components, str = 0, len = 0) {
  components.forEach((component, index) => {
    const i = component.findIndex((e) => e === port)
    if (i === -1) {
      if (strength < str) strength = str
      if (length < len) {
        length = len
        strengthB = str
      } else if (length === len) {
        if (strengthB < str) strengthB = str
      }
      return
    }
    dfs(
      component[1 - i],
      [...components.slice(0, index), ...components.slice(index + 1)],
      str + component[0] + component[1],
      len + 1
    )
  })
}

dfs(0, allComponents)

const resultA = strength
const resultB = strengthB

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
