const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input()
    .split("")
    .map((e) => (e === ">" ? 1 : -1));

  const rocks = `
####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`
    .trim()
    .split("\n\n")
    .map((e, i) =>
      e
        .split("\n")
        .map((e) => e.split("").map((e) => (e === "#" ? i + 1 : 0)))
        .reverse()
    );

  let moveIdx = 0;
  const canvas = [];
  const ROUNDS = 2022;

  round: for (let round = 0; round < ROUNDS; round++) {
    const rock = rocks[round % rocks.length];
    let x = 2;
    let y = 3 + canvas.length;

    let moves = [];
    fall: while (true) {
      // move
      let move = data[moveIdx % data.length];
      moves.push(move);
      x += move;
      moveIdx++;

      if (x + rock[0].length > 7) {
        x -= move;
      } else if (x < 0) {
        x -= move;
      } else {
        check: for (let dy = 0; dy < rock.length; dy++) {
          for (let dx = 0; dx < rock[dy].length; dx++) {
            if (rock[dy][dx] && canvas[y + dy]?.[x + dx]) {
              x -= move;
              break check;
            }
          }
        }
      }

      // fall
      y -= 1;
      if (y < 0) {
        y++;
        break fall;
      }
      for (let dy = 0; dy < rock.length; dy++) {
        for (let dx = 0; dx < rock[dy].length; dx++) {
          if (rock[dy][dx] && canvas[y + dy]?.[x + dx]) {
            y++;
            break fall;
          }
        }
      }
    }

    for (let dy = 0; dy < rock.length; dy++) {
      if (!canvas[y + dy]) canvas.push(Array(7).fill(0));
      for (let dx = 0; dx < rock[dy].length; dx++) {
        if (!rock[dy][dx]) continue;
        canvas[y + dy][x + dx] = 1;
      }
    }
  }

  console.info(canvas.length);
}
