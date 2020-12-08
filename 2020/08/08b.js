const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

class Interpreter {
  constructor(code, idx, acc) {
    this.original = code
    this.reset(idx, acc)
  }

  reset = function (idx = 0, acc = 0) {
    this.code = this.original.map((e) => [...e])
    this.idx = idx
    this.acc = acc
    this.executed = []
  }

  solve = function () {
    while (true) {
      if (this.executed.includes(this.idx)) {
        return { idx: this.idx, acc: this.acc, loop: true }
      }
      if (this.idx === this.code.length) {
        return { idx: this.idx, acc: this.acc, loop: false }
      }
      this.executed.push(this.idx)
      switch (this.code[this.idx][0]) {
        case "nop":
          this.idx++
          break
        case "acc":
          this.acc += this.code[this.idx][1]
          this.idx++
          break
        case "jmp":
          this.idx += this.code[this.idx][1]
          break
      }
    }
  }

  fixLoop() {
    let fixIdx = 0
    while (true) {
      if (!(this.code[fixIdx][0] === "jmp" || this.code[fixIdx][0] === "nop")) {
        fixIdx++
        continue
      }
      this.reset()
      this.code[fixIdx][0] = this.code[fixIdx][0] === "jmp" ? "nop" : "jmp"
      const solution = this.solve()
      if (!solution.loop) {
        return [fixIdx, solution]
      }
      fixIdx++
    }
  }
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .split("\r\n")
    .map((row) => row.split(" "))
    .map((row) => [row[0], Number(row[1])])
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function solve(data) {
  const interpreter = new Interpreter(data)
  return interpreter.fixLoop()
}
