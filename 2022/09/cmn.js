const NEIGHBORS_A = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const NEIGHBORS_B = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

const NEIGHBORS = [...NEIGHBORS_A, ...NEIGHBORS_B];

const move = {
  U: ([r, c]) => [r - 1, c],
  D: ([r, c]) => [r + 1, c],
  L: ([r, c]) => [r, c - 1],
  R: ([r, c]) => [r, c + 1],
};
exports.move = move;

function adjecent([i, j], [k, l]) {
  return Math.abs(i - k) < 2 && Math.abs(j - l) < 2;
}
exports.adjecent = adjecent;

function closer([i, j], [k, l]) {
  const setA = new Set();
  const setB = new Set();
  for (const [di, dj] of NEIGHBORS_A) {
    const pos = [i + di, j + dj];
    setA.add(pos.join(","));
  }
  for (const [di, dj] of NEIGHBORS_B) {
    const pos = [i + di, j + dj];
    setB.add(pos.join(","));
  }
  for (const [di, dj] of NEIGHBORS) {
    const pos = [k + di, l + dj];
    if (setA.has(pos.join(","))) return pos;
  }
  for (const [di, dj] of NEIGHBORS) {
    const pos = [k + di, l + dj];
    if (setB.has(pos.join(","))) return pos;
  }
}
exports.closer = closer;
