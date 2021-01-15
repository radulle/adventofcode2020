const fs = require("fs")
console.time()

const input = +fs.readFileSync("data.txt", "utf8").trim()

const check = (x, y) =>
  (
    (x * x + 3 * x + 2 * x * y + y + y * y + input).toString(2).match(/1/g) ||
    []
  ).length % 2
    ? false
    : true

const neighbors = (x, y) =>
  [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ].reduce((acc, [a, b]) => {
    const neighbor = [a + x, b + y]
    if (!neighbor.some((e) => e < 0) && check(...neighbor)) acc.push(neighbor)
    return acc
  }, [])

const hash = (string) => JSON.stringify(string)
const parse = (string) => JSON.parse(string)
const done = (x, y) => x === 31 && y === 39
const visited = new Set()
let que = ["[1,1]"],
  i = 1,
  resultA,
  resultB

const go = () => {
  main: while (que.length) {
    const nQue = []
    for (const xy of que) {
      const [x, y] = parse(xy)
      if (done(x, y)) {
        resultA = i
        break main
      }
      neighbors(x, y).forEach((e) => {
        const h = hash(e)
        if (visited.has(h)) return
        visited.add(h)
        nQue.push(h)
      })
    }
    que = nQue
    if (i === 50) resultB = visited.size
    i++
  }
}
go()

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
