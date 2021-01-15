const fs = require("fs")
const crypto = require("crypto")
console.time()

const salt = fs.readFileSync("data.txt", "utf8").trim()

const top = 3
const parse = (string) => JSON.parse(string)
const hash = (pos, path) => JSON.stringify([pos, path])
const done = (pos) => !pos.some((e) => e !== 3)

const move = [
  ([r, c]) => [r - 1, c],
  ([r, c]) => [r + 1, c],
  ([r, c]) => [r, c - 1],
  ([r, c]) => [r, c + 1],
]

const directions = ["U", "D", "L", "R"]

const go = (salt) => {
  let que = [`[[0,0],""]`]
  let i = 0
  const visited = new Set()
  const paths = []
  while (que.length) {
    const nQue = []
    for (const hsh of que) {
      const [pos, path] = parse(hsh)
      if (done(pos)) {
        paths.push([i, path])
        continue
      }
      const open = crypto
        .createHash("md5")
        .update(salt + path)
        .digest("hex")
        .slice(0, 4)
        .split("")
        .map((e) => e !== "a" && isNaN(+e))
      open.forEach((e, j) => {
        if (!e) return
        const nPos = move[j](pos)
        if (nPos.some((e) => e < 0 || e > top)) return
        const h = hash(nPos, path + directions[j])
        if (visited.has(h)) return
        nQue.push(h)
        visited.add(h)
      })
    }
    que = nQue
    i++
  }
  return paths
}

const results = go(salt)

const resultA = results[0]
const resultB = results[results.length - 1]

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
