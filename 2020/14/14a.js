const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split(/\] = | = |\[/g))
  .map((e) => {
    if (e.length === 3)
      return {
        cmd: e[0],
        adr: Number(e[1]),
        val: Number(e[2]).toString(2),
      }
    return {
      cmd: e[0],
      mask: e[1]
        .split("")
        .reverse()
        .map((c, i) => {
          if (c !== "X")
            return (str) => {
              const arr = str.split("").reverse()
              arr.push(...new Array(36 - arr.length).fill("0"))
              arr[i] = c
              return arr.reverse().join("")
            }
          return undefined
        })
        .filter((e) => e !== undefined),
    }
  })

let mask
const mem = new Map()

data.forEach((row) => {
  if (row.cmd === "mask") return (mask = row.mask)
  mem.set(
    row.adr,
    parseInt(
      mask.reduce((acc, cur) => cur(acc), row.val),
      2
    )
  )
})

console.info([...mem.values()].reduce((acc, cur) => acc + cur))
