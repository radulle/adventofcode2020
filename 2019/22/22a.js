const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .replace(/deal with increment/g, "increment")
  .replace(/deal into new stack/g, "stack")
  .split("\r\n")
  .map((row) => row.split(" "))
  .map(([func, arg]) => ({ func, arg }))

const size = 10007

const factoryDeck = [...new Array(size).keys()]

const stack = (deck) => [...deck].reverse()

const cut = (deck, n) => [...deck.slice(n), ...deck.slice(0, n)]

const increment = (deck, n) => {
  let i = 0
  let j = 0
  const newDeck = new Array(size)
  deck.forEach((el) => {
    newDeck[(i * n) % size] = el
    i++
  })
  return newDeck
}

const shuffle = (deck, func, n) => {
  switch (func) {
    case "stack":
      return stack(deck)
    case "cut":
      return cut(deck, n)
    case "increment":
      return increment(deck, n)
  }
}

const shuffled = data.reduce(
  (acc, { func, arg }) => shuffle(acc, func, arg),
  factoryDeck
)
console.info(
  shuffled,
  shuffled.findIndex((e) => e === 2019)
)
