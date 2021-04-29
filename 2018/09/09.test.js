const { assert } = require("console")
const { run } = require("./run")
console.time()

const tests = [
  ...`9 players; last marble is worth 25 points: high score is 32
10 players; last marble is worth 1618 points: high score is 8317
13 players; last marble is worth 7999 points: high score is 146373
17 players; last marble is worth 1104 points: high score is 2764
21 players; last marble is worth 6111 points: high score is 54718
30 players; last marble is worth 5807 points: high score is 37305
428 players; last marble is worth 72061 points: high score is 409832
428 players; last marble is worth 7206100 points: high score is 3469562780`.matchAll(
    /(\d+) players; last marble is worth (\d+) points: high score is (\d+)/g
  ),
].map(([_, p, m, r]) => [+p, +m, +r])
tests.forEach(([p, m, r]) => assert(run(p, m) === r))

console.timeEnd()
