const fs = require("fs")
console.time()

const parse = (p) => p.split(",").map(Number)
const hash = (p) => p.join(",")
const add = (a, b) => a.map((e, i) => e + b[i])
let particles = {}
;[
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/.=<(.+?)>, .=<(.+?)>, .=<(.+?)>/g),
].forEach(([_, p, v, a], i) => {
  particles[p] = [
    ...(particles[p] || []),
    {
      i,
      p: parse(p),
      v: parse(v),
      a: parse(a),
    },
  ]
})

const MOVES = 42 // increase if needed
for (let i = 0; i < MOVES; i++) {
  let newParticles = {}
  for (const [pos, grp] of Object.entries(particles)) {
    if (grp.length !== 1) {
      continue
    }
    const particle = grp[0]
    particle.v = add(particle.v, particle.a)
    particle.p = add(particle.p, particle.v)
    newParticles[hash(particle.p)] = [
      ...(newParticles[hash(particle.p)] || []),
      particle,
    ]
  }
  particles = newParticles
}

let resultB = Object.keys(particles).length

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
