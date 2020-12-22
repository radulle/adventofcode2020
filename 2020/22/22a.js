console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

function parseData(data) {
  const split = data
    .replace(/\r\n/g, "\n")
    .split(/\n\n/g)
    .map((row) => row.split("\n").slice(1).map(Number))
  return split
}

const data = parseData(getData("data.txt"))

const deckA = data[0]
const deckB = data[1]

while (deckA.length && deckB.length) {
  const cardA = deckA.shift()
  const cardB = deckB.shift()
  if (cardA > cardB) {
    deckA.push(cardA)
    deckA.push(cardB)
  }
  if (cardB > cardA) {
    deckB.push(cardB)
    deckB.push(cardA)
  }
}

let result = 0

data.forEach((deck) =>
  deck.forEach((cur, idx, arr) => {
    result += cur * (arr.length - idx)
  })
)

console.info()
console.info("Solution:")
console.info(result)
console.info()
console.timeEnd()
