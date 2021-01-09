const fs = require("fs")
console.time()

const [y1, x1] = fs
  .readFileSync("data.txt", "utf8")
  .match(/\d{1,}/g)
  .map(Number)

// x = column, y = row
function squares(x1, y1) {
  const cathetus = x1 + y1 - 1
  return (cathetus * cathetus - cathetus) / 2 + x1
}

const initial = 20151125

const next = (prev) => (prev * 252533) % 33554393

const apply = (squares) => {
  let val = initial
  for (let i = 0; i < squares - 1; i++) {
    val = next(val)
  }
  return val
}

const resultA = apply(squares(x1, y1))

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()
