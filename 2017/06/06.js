const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(/\s/).map(Number)

class Memory {
  states = new Map()

  constructor(data) {
    this.banks = data.slice()
    this.states.set(this.hash(), 0)
  }

  max = () => Math.max(...this.banks)
  index = (val) => this.banks.indexOf(val)
  hash = () => this.banks.join("_")

  redistribute(distribution) {
    const max = this.max()
    const index = this.index(max)
    this.banks[index] = 0
    for (let i = 1; i <= max; i++) {
      this.banks[(index + i) % this.banks.length]++
    }
    if (this.states.has(this.hash())) return true
    this.states.set(this.hash(), distribution)
    return false
  }

  optimize() {
    let distribution = 1
    while (!memory.redistribute(distribution)) {
      distribution++
    }
    return [this.states.size, this.states.size - this.states.get(this.hash())]
  }
}

const memory = new Memory(data)

const [resultA, resultB] = memory.optimize()

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
