console.time()

// h is the number of non primes between b and c
let b = 81 * 100 + 100000,
  c = b + 17000,
  d,
  h = 0
for (; b <= c; b += 17) {
  for (d = 2; d * d <= b; d++) {
    if (b % d === 0) {
      h++
      break
    }
  }
}

const resultB = h

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
