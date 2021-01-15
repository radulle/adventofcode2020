const fs = require("fs")
console.time()

const salt = fs.readFileSync("data.txt", "utf8").trim()

const md5 = (i, r = 1) => {
  let md5 = salt + i
  for (let j = 0; j < r; j++) {
    md5 = crypto.createHash("md5").update(md5).digest("hex")
  }
  return md5
}

const run = (r) => {
  let i = 0,
    n = 0
  const hashes = []
  while (i < 1000) {
    hashes.push(md5(i, r))
    i++
  }
  i = 0
  main: while (true) {
    hashes.push(md5(i + 1000, r))
    const match = /(.)\1\1/.exec(hashes[i])
    if (match !== null) {
      for (let j = i + 1; j < i + 1000; j++) {
        if (new RegExp(match[1].repeat(5)).test(hashes[j])) {
          n++
          if (n === 64) break main
          break
        }
      }
    }
    i++
  }
  return i
}

const resultA = run()

const resultB = run(2017)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
