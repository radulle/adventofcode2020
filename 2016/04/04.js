const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")

const valid = []

const check = (room) => {
  const name = room.split(/\d/)[0].slice(0, -1)
  const letters = [
    ...room
      .match(/[a-z](?![^\[]*\])/g)
      .reduce((acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1), new Map())
      .entries(),
  ]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .reduce((acc, cur) => acc + cur[0], "")
  const sector = Number(room.match(/\d{1,}/g))
  const checksum = room.match(/(?<=\[).+?(?=\])/g)[0]
  if (letters === checksum) valid.push([name, sector])
}

data.forEach(check)

let resultA = valid.reduce((acc, cur) => acc + cur[1], 0)

function next(char) {
  if (char === " " || char === "-") return " "
  return char === "z" ? "a" : String.fromCharCode(char.charCodeAt(0) + 1)
}

const shift = ([name, sector]) => {
  name = name.split("")
  const amt = sector % 26
  for (let i = 0; i < amt; i++) {
    name = name.map(next)
  }
  return [name.join(""), sector]
}

const shifted = valid.map(shift)

let resultB = shifted.find((e) => /north.*pole.*object/i.test(e[0]))[1]

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")

console.timeEnd()
