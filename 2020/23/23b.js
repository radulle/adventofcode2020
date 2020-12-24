console.time()
const fs = require("fs")
const { CircularLinkedList, Node } = require("../linkedList")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

function parseData(data) {
  const split = data.split("").map(Number)
  return split
}

class Cups extends CircularLinkedList {
  pickedCups
  dest
  destCup
  maxAll = 0
  append(cup) {
    if (cup > this.maxAll) this.maxAll = cup
    this.appendNode(new Node(cup))
  }
  pick() {
    this.pickedCups = this.removeNodesAfterHead(3)
    this.dest = this.head.element - 1
    while (!this.map.has(this.dest)) {
      if (this.dest === 0) {
        this.dest = this.getMaxNotPicked()
        break
      }
      this.dest -= 1
    }
    this.destCup = this.map.get(this.dest)
  }
  getMaxNotPicked() {
    let max = this.maxAll
    const picked = []
    let current = this.pickedCups
    while (current) {
      picked.push(current.element)
      current = current.next
    }
    picked
      .sort((a, b) => b - a)
      .forEach((e) => {
        if (max === e) max--
      })
    return max
  }
  push() {
    this.insertNodesAfterNode(this.destCup, this.pickedCups)
    this.moveHeadBy(1)
  }
  move(moves) {
    for (let move = 0; move < moves; move++) {
      this.pick()
      this.push()
    }
  }
  get after1() {
    return this.array.join("").split("1").reverse().join("")
  }
}

const cups = new Cups()

parseData(getData("data.txt")).forEach((cup) => cups.append(cup))
for (let cup = 10; cup < 1e6 + 1; cup++) {
  cups.append(cup)
}

cups.move(1e7)

const result = cups.getNodeByElement(1)
const A = result.next
const B = A.next

console.info()
console.info("Solution:")
console.info(A.element * B.element)
console.info()
console.timeEnd()
