// Tutorial: https://codeforces.com/blog/entry/72593

console.time()

const shuffle = require("fs").readFileSync("data.txt", "utf8").split(/\r?\n/)

const resultA = solveA(shuffle, 10007, 2019)

const resultB = solveB(shuffle, 119315717514047, 2020, 101741582076661)

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:\n")
console.info(resultB, "\n")
console.timeEnd()

function solveA(shuffle, size, pos) {
  return shuffle.reduce((pos, line) => {
    const cases = [
      [/deal into new stack/, () => size - pos - 1],
      [/deal with increment (\S+)/, (a) => mulMod(pos, a, size)],
      [/cut (\S+)/, (a) => (pos - a) % size],
    ]
    for (const [regExp, fun] of cases) {
      const match = regExp.exec(line)
      if (match) return fun(+match[1])
    }
  }, pos)
}

function solveB(shuffle, size, pos, repeat) {
  let [a, b] = shuffle.reduceRight(
    ([a, b], line) => {
      const cases = [
        [/new stack/g, () => [(size - a) % size, (size + size - b - 1) % size]],
        [
          /increment (\S+)/g,
          (aa) => [divMod(a, aa, size), divMod(b, aa, size)],
        ],
        [/cut (\S+)/g, (bb) => [a, (((b + bb) % size) + size) % size]],
      ]
      for (const [regExp, fun] of cases) {
        const match = regExp.exec(line)
        if (match) return fun(+match[1])
      }
    },
    [1, 0]
  )
  while (repeat) {
    if (repeat % 2) pos = (mulMod(pos, a, size) + b) % size
    ;[a, b] = [mulMod(a, a, size), (mulMod(a, b, size) + b) % size]
    repeat = Math.floor(repeat / 2)
  }
  return pos
}

function gcdExtended(a, b) {
  let x = 0,
    y = 1,
    u = 1,
    v = 0
  while (a !== 0) {
    const q = Math.floor(b / a)
    ;[x, y, u, v] = [u, v, x - u * q, y - v * q]
    ;[a, b] = [b % a, a]
  }
  return [b, x, y]
}

function modInverse(a, m) {
  const [g, x] = gcdExtended(a, m)
  if (g !== 1) throw "Bad mod inverse"
  return (x + m) % m
}

function mulMod(a, b, m) {
  return Number((BigInt(a) * BigInt(b)) % BigInt(m))
}

function divMod(a, b, m) {
  return mulMod(a, modInverse(b, m), m)
}
