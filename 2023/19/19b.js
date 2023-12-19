const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const workflows = {};
  input
    .split("\n\n")[0]
    .split("\n")
    .forEach((workflow) => {
      let [, key, process] = workflow.match(/(.+){(.+)}/);
      process = process.split(",").map((p) => {
        const match = p.match(/(?<cat>.)(?<op>[<>])(?<limit>\d+):(?<to>.+)/);
        if (!match) return p;
        const { cat, op, limit, to } = match.groups;
        return { cat, op, limit: +limit, to };
      });
      workflows[key] = process;
    });
  return workflows;
}

function process(workflows) {
  let sum = 0;
  const queue = [];
  queue.push([
    "in",
    { x: 1, X: 4000, m: 1, M: 4000, a: 1, A: 4000, s: 1, S: 4000 },
  ]);
  while (queue.length) {
    let [state, { x, X, m, M, a, A, s, S }] = queue.pop();
    if (state === "R") continue;
    if (state === "A") {
      sum += (X - x + 1) * (M - m + 1) * (A - a + 1) * (S - s + 1);
      continue;
    }
    if (x > X || m > M || a > A || s > S) continue;
    for (const cond of workflows[state]) {
      if (typeof cond === "string") {
        queue.push([cond, { x, X, m, M, a, A, s, S }]);
        break;
      }
      const { cat, op, limit, to } = cond;
      queue.push([to, nRanges(cat, op, limit, { x, X, m, M, a, A, s, S })]);
      const r = nRanges(cat, nOp(op), limit, { x, X, m, M, a, A, s, S });
      (x = r.x), (X = r.X), (m = r.m), (M = r.M);
      (a = r.a), (A = r.A), (s = r.s), (S = r.S);
    }
  }
  return sum;
}

function nRange(op, limit, v, V) {
  if (op === ">") return [Math.max(limit + 1, v), V];
  if (op === "<") return [v, Math.min(limit - 1, V)];
  if (op === ">=") return [Math.max(limit, v), V];
  if (op === "<=") return [v, Math.min(limit, V)];
}

function nRanges(cat, op, limit, ranges) {
  const CAT = cat.toUpperCase();
  const [v, V] = nRange(op, limit, ranges[cat], ranges[CAT]);
  (ranges[cat] = v), (ranges[CAT] = V);
  return ranges;
}

function nOp(op) {
  if (op === ">") return "<=";
  if (op === "<") return ">=";
}
