const fs = require("fs")

console.time()
const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .replace(/: |, |capacity|durability|flavor|texture|calories/g, "")
  .split("\n")
  .map((row) => row.split(" "))
  .map((row) => row.slice(1))

function cookie(...args) {
  const comb = [0, 0, 0, 0, 0]
  args.forEach((arg, i) => {
    data[i].map((e) => e * arg).forEach((e, i) => (comb[i] += e))
  })
  const calories = comb.pop()
  return [
    Math.min(...comb) <= 0 ? 0 : comb.reduce((agg, cur) => agg * cur, 1),
    calories,
  ]
}

function loops(callback) {
  for (let i = 0; i < 101; i++) {
    for (let j = 0; j < 101 - i; j++) {
      for (let k = 0; k < 101 - i - j; k++) {
        callback(...cookie(i, j, k, 100 - i - j - k))
      }
    }
  }
}

let resultA = 0
loops((score) => {
  if (score > resultA) resultA = score
})

let resultB = 0
loops((score, calories) => {
  if (score > resultB && calories === 500) resultB = score
})

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
