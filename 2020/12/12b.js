const fs = require("fs")

let data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => ({ cmd: row[0], amt: Number(row.slice(1)) }))

let posN = 0
let posE = 0
let N = 1
let E = 10

function rot(ang, N, E) {
  return [
    Math.round(Math.cos((ang * Math.PI) / 180)) * N -
      Math.round(Math.sin((ang * Math.PI) / 180)) * E,
    Math.round(Math.cos((ang * Math.PI) / 180)) * E +
      Math.round(Math.sin((ang * Math.PI) / 180)) * N,
  ]
}

function eval({ cmd, amt }) {
  let r
  switch (cmd) {
    case "R":
      r = rot(amt, N, E)
      N = r[0]
      E = r[1]
      break
    case "L":
      r = rot(-amt, N, E)
      N = r[0]
      E = r[1]
      break
    case "F":
      posE += amt * E
      posN += amt * N
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

data.forEach(eval)
console.info(Math.abs(posN) + Math.abs(posE))
