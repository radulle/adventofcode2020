const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  const data = input.split("\n").map((line) => {
    const [, draw, card] = line
      .trim()
      .split(/[:|]/)
      .map((e) =>
        e
          .trim()
          .split(/ +/)
          .map((n) => +n)
      );
    return { draw, card, count: 1, wins: 0 };
  });

  const sum = [0, 0];

  for (let i = 0; i < data.length; i++) {
    const { draw, card, count } = data[i];
    draw.forEach((d) => card.includes(d) && (data[i].wins += 1));
    for (let j = 1; j <= data[i].wins; j++) data[j + i].count += count;
  }

  sum[0] = data
    .filter((e) => e.wins)
    .reduce((acc, { wins }) => acc + 2 ** (wins - 1), 0);
  sum[1] = data.reduce((acc, { count }) => acc + count, 0);
  return sum;
}
