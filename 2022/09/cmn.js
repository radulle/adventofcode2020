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

function middle([i, j], [k, l]) {
  let a = (i + k) / 2;
  if (a % 1) a = i;
  let b = (j + l) / 2;
  if (b % 1) b = j;
  return [a, b];
}
exports.middle = middle;
