const fs = require("fs")
console.time()

let particles = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/.=<(.+?)>, .=<(.+?)>, .=<(.+?)>/g),
].map(([_, p, v, a], i) => ({
  i,
  p: p.split(",").map(Number),
  v: v.split(",").map(Number),
  a: a.split(",").map(Number),
}))

const sum = (e) => e.reduce((acc, cur) => acc + Math.abs(cur), 0)
const agg = particles.map(({ p, v, a, i }) => ({
  i,
  p: sum(p),
  v: sum(v),
  a: sum(a),
}))

let resultA = agg
  .sort((a, b) => a.p - b.p)
  .sort((a, b) => a.v - b.v)
  .sort((a, b) => a.a - b.a)[0].i

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()
