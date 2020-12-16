const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n\r\n")
  .map((row) => row.split("\r\n"))

const ranges = data[0]
  .map((row) => row.split(": "))
  .map(([key, val]) => ({
    key,
    val: val.split(" or ").map((pair) => pair.split("-").map(Number)),
  }))

const myTicket = data[1][1].split(",").map(Number)

const tickets = data[2].slice(1).map((ticket) => ticket.split(",").map(Number))

const validRanges = ranges.flatMap(({ key, val }) => val)

const result = []

tickets.forEach((ticket) =>
  ticket.forEach((part) => {
    if (
      !validRanges.some(([min, max]) => {
        if (part < min) return false
        if (part > max) return false
        return true
      })
    ) {
      result.push(part)
    }
  })
)

console.info(result.reduce((acc, cur) => acc + cur))
