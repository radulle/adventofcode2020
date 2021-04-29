const { LinkedListDoubleCircular } = require("lib")

function run(players, maxMarble) {
  const list = new LinkedListDoubleCircular()
  list.append(0)
  const scores = Array(players).fill(0)
  let player = 0
  let i = 1
  let cur = list.tail

  while (i < maxMarble + 1) {
    if (i % 23 === 0) {
      scores[player] += i
      for (let i = 0; i < 7; i++) {
        cur = cur.prev
      }
      scores[player] += cur.id
      const newCur = cur.next
      list.remove(cur)
      cur = newCur
    } else {
      cur = cur.next
      cur = list.insert(i, cur)
    }
    player = (player + 1) % players
    i++
  }
  return Math.max(...scores)
}

module.exports = { run }
