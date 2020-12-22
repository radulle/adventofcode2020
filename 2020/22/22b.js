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

const hash = (deckA, deckB) => deckA.join(",") + ":" + deckB.join(",")

function game(deckA, deckB) {
  const log = new Set()
  while (deckA.length && deckB.length) {
    if (log.has(hash(deckA, deckB))) return true
    log.add(hash(deckA, deckB))
    const cardA = deckA.shift()
    const cardB = deckB.shift()
    const aWon =
      deckA.length >= cardA && deckB.length >= cardB
        ? game(deckA.slice(0, cardA), deckB.slice(0, cardB))
        : cardA > cardB
    if (aWon) {
      deckA.push(cardA, cardB)
    } else {
      deckB.push(cardB, cardA)
    }
  }

  return Boolean(deckA.length)
}

const data = parseData(getData("data.txt"))

const deckA = data[0]
const deckB = data[1]

game(deckA, deckB)

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
