const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")

let resultA = 0
let resultB = 0

for (const ip of data) {
  const pos = ip.split(/\[.*?\]/)
  const neg = ip.match(/(?<=\[).+?(?=\])/g)

  if (
    pos.some((e) => /(.)(?!\1)(.)\2\1/.test(e)) &&
    neg.every((e) => !/(.)(?!\1)(.)\2\1/.test(e))
  )
    resultA++

  const found = []
  pos.forEach((e) => {
    for (const match of e.matchAll(/(.)(?!\1)(?=(.)\1)/g)) {
      found.push(match[2] + match[1] + match[2])
    }
  })
  if (found.some((a) => neg.some((b) => b.includes(a)))) resultB++
}

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")

console.timeEnd()
