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

const validRanges = ranges.flatMap(({ val }) => val)

const invalidParts = []

tickets.forEach((ticket) =>
  ticket.forEach((part) => {
    if (
      !validRanges.some(([min, max]) => {
        if (part < min) return false
        if (part > max) return false
        return true
      })
    ) {
      invalidParts.push(part)
    }
  })
)

const validTickets = tickets.filter(
  (ticket) => !ticket.some((part) => invalidParts.includes(part))
)

const parts = validTickets.reduce(
  (acc, cur) => {
    cur.forEach((part, idx) => {
      acc[idx].push(part)
    })
    return acc
  },
  new Array(ranges.length).fill(null).map(() => new Array())
)

const keys = parts
  .map((row) =>
    ranges.filter((range) =>
      row.every((part) =>
        range.val.some(([min, max]) => {
          if (part < min) return false
          if (part > max) return false
          return true
        })
      )
    )
  )
  .map((row, idx) => {
    row.idx = idx
    return row
  })
  .sort((a, b) => a.length - b.length)
  .map((cur, idx, arr) => {
    const prev = arr[idx - 1]
    if (!prev) return { key: cur[0].key, idx: cur.idx }
    return {
      key: cur
        .map((row) => row.key)
        .find((key) => !prev.map((row) => row.key).includes(key)),
      idx: cur.idx,
    }
  })

const result = keys
  .map(({ key, idx }) => ({ key, val: myTicket[idx] }))
  .filter((part) => /departure/.test(part.key))
  .reduce((acc, { val }) => acc * val, 1)

console.info(result)
