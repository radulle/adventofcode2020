const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split(/\] = | = |\[/g))
  .map((e) => {
    if (e.length === 3)
      return {
        cmd: e[0],
        adr: Number(e[1]).toString(2),
        val: Number(e[2]),
      }
    if (e.length === 2)
      return {
        cmd: e[0],
        mask: e[1]
          .split("")
          .reverse()
          .map((c, i) => {
            const func = (b) => (str) => {
              const arr = str.split("").reverse()
              arr.push(...new Array(36 - arr.length).fill("0"))
              arr[i] = b
              return arr.reverse().join("")
            }
            if (c === "1") return [func("1")]
            if (c === "X") return [func("0"), func("1")]
            if (c === "0") return [(str) => str]
          }),
      }
    return undefined
  })

let mask
const mem = new Map()

data.forEach((row) => {
  if (!row) return
  if (row.cmd === "mask") return (mask = row.mask)
  mask
    .reduce((acc, cur) => acc.flatMap((val) => cur.map((f) => f(val))), [
      row.adr,
    ])
    .map((e) => parseInt(e, 2))
    .forEach((e) => mem.set(e, row.val))
})

const sum = (acc, cur) => acc + cur
console.info([...mem.values()].reduce(sum))
