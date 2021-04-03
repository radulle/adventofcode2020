const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split("").map(Number)

const resultA = data.reduce(
  (acc, cur, idx, arr) =>
    acc + cur * (cur === arr[idx + 1 < arr.length ? idx + 1 : 0] ? 1 : 0),
  0
)
const resultB = data.reduce((acc, cur, idx, arr) => {
  const mdx = idx + arr.length / 2
  const mel = arr[mdx < arr.length ? mdx : mdx - arr.length]
  return acc + cur * (cur === mel ? 1 : 0)
}, 0)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
