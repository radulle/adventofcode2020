const fs = require("fs")

console.time()
const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.slice(row.indexOf(":") + 2))
  .map((row, id) => {
    return {
      id: id + 1,
      ...JSON.parse(
        `{${row}}`.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
      ),
    }
  })

const aunt = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const resultA = data.filter(({ id, ...rest }) =>
  Object.entries(rest).every(([key, val]) => val === aunt[key])
)[0].id

let resultB = data.filter(({ id, ...rest }) =>
  Object.entries(rest).every(([key, val]) => {
    if (key === "cats" || key === "trees") return val > aunt[key]
    if (key === "pomeranians" || key === "goldfish") return val < aunt[key]
    return val === aunt[key]
  })
)[0].id

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
