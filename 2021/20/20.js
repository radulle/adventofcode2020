const { input, consoleTime } = require("lib");

consoleTime(() => {
  let [alg, img] = input().split("\n\n");
  const num = (e) => (e === "#" ? 1 : 0);
  alg = alg.split("").map(num);
  img = img.split("\n").map((row) => row.split("").map(num));

  const area = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  function enc(img, inf = 0) {
    const calc = (i, j) =>
      alg[
        parseInt(
          area.reduce(
            (acc, [di, dj]) => acc + (img[i + di]?.[j + dj] ?? inf),
            ""
          ),
          2
        )
      ];

    const nimg = Array(img.length + 2)
      .fill()
      .map(() => Array(img[0].length + 2));

    for (let i = 0; i < nimg.length; i++) {
      for (let j = 0; j < nimg[i].length; j++) {
        nimg[i][j] = calc(i - 1, j - 1);
      }
    }
    return [nimg, inf === 0 ? alg[0] : alg[alg.length - 1]];
  }

  const TIMES = 50;
  let inf = 0;
  const results = [];
  for (let i = 0; i < TIMES; i++) {
    [img, inf] = enc(img, inf);
    if (i === 1 || i === 49)
      results.push(img.flat().reduce((acc, cur) => acc + cur));
  }
  return results;
});
