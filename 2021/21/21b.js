const { input, consoleTime } = require("lib");

consoleTime(() => {
  const pos = [...input.matchAll(/Player \d+ starting position: (\d+)/g)].map(
    (e) => Number(e[1])
  );

  const split = [];
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      for (let k = 1; k < 4; k++) {
        split.push(i + j + k);
      }
    }
  }

  let distinct = split.reduce((acc, cur) => {
    acc[cur] = (acc[cur] | 0) + 1;
    return acc;
  }, {});
  distinct = Object.entries(distinct).map(([a, b]) => [Number(a), b]);

  let winA = 0;
  let winB = 0;
  const universes = [];
  universes.push([...pos, 0, 0, 1]);

  while (universes.length) {
    const [posA, posB, scoreA, scoreB, count] = universes.pop();
    for (let i = 0; i < distinct.length; i++) {
      let nPosA = (posA + distinct[i][0]) % 10;
      if (nPosA === 0) nPosA = 10;
      const nScoreA = scoreA + nPosA;
      if (nScoreA > 20) {
        winA += count * distinct[i][1];
        continue;
      }
      for (let j = 0; j < distinct.length; j++) {
        let nPosB = (posB + distinct[j][0]) % 10;
        if (nPosB === 0) nPosB = 10;
        const nScoreB = scoreB + nPosB;
        if (nScoreB > 20) {
          winB += count * distinct[j][1];
          continue;
        }
        universes.push([
          nPosA,
          nPosB,
          nScoreA,
          nScoreB,
          count * distinct[i][1] * distinct[j][1],
        ]);
      }
    }
  }

  return Math.max(winA, winB);
});
