const { input, consoleTime } = require("lib");

consoleTime(() => {
  const pos = [...input().matchAll(/Player \d+ starting position: (\d+)/g)].map(
    (e) => Number(e[1])
  );

  const players = pos.length;
  let rolls = 0;
  let dice = 0;
  const roll = () => {
    dice++;
    rolls++;
    if (dice > 100) dice = 1;
    return dice;
  };

  const score = [0, 0];

  main: while (true) {
    for (let i = 0; i < players; i++) {
      const move = roll() + roll() + roll();
      pos[i] = (pos[i] + move) % 10;
      if (pos[i] === 0) pos[i] = 10;
      score[i] += pos[i];
      if (score[i] >= 1000) break main;
    }
  }

  return Math.min(...score.map((e) => e * rolls));
});
