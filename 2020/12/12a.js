const fs = require("fs")

let data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => ({ cmd: row[0], amt: Number(row.slice(1)) }))

let N = 0
let E = 0
let dir = 90

function eval({ cmd, amt }) {
  switch (cmd) {
    case "R":
      dir += amt
      break
    case "L":
      dir -= amt
      break
    case "F":
      E += Math.round(Math.sin((dir * Math.PI) / 180) * amt)
      N += Math.round(Math.cos((dir * Math.PI) / 180) * amt)
      break
    case "N":
      N += amt
      break
    case "E":
      E += amt
      break
    case "S":
      N -= amt
      break
    case "W":
      E -= amt
      break
    default:
      break
  }
}

data.forEach((row) => {
  eval(row)
})
console.info(Math.abs(N) + Math.abs(E))
