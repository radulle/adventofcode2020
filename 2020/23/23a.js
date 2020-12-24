console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

function parseData(data) {
  const split = data.split("").map(Number)
  return split
}

const data = parseData(getData("data.txt"))

class Cups {
  constructor(cups) {
    this.cups = cups
  }
  picked = []
  dest
  destIndex
  pick() {
    this.picked = this.cups.splice(1, 3)
    this.dest = this.cups[0] - 1
    while (!this.cups.includes(this.dest)) {
      if (this.dest === 0) {
        this.dest = Math.max(...this.cups)
        break
      }
      this.dest -= 1
    }
    this.destIndex = this.cups.findIndex((e) => e === this.dest)
  }
  push() {
    this.cups[this.destIndex] = [this.cups[this.destIndex], ...this.picked]
    this.cups = this.cups.flat()
    this.picked.length = 0
    this.cups.push(this.cups.shift())
  }
  move(moves) {
    for (let move = 0; move < moves; move++) {
      this.pick()
      this.push()
    }
  }
  get after1() {
    return this.cups.join("").split("1").reverse().join("")
  }
}

const cups = new Cups(data)
cups.move(100)

const result = cups.after1

console.info()
console.info("Solution:")
console.info(result)
console.info()
console.timeEnd()
