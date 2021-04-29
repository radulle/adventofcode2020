const fs = require("fs")
const { run } = require("./run")
console.time()

let [
  _,
  players,
  marbles,
] = /(\d+) players; last marble is worth (\d+) points/g.exec(
  fs.readFileSync("data.txt", "utf8")
)
players = Number(players)
marbles = Number(marbles)

const resultA = run(players, marbles)

const resultB = run(players, marbles * 100)

console.info("\nSolution A:")
console.info(resultA, "\n")
console.info("Solution B:")
console.info(resultB, "\n")
console.timeEnd()

module.exports = { run }
