const { input, consoleTime, Queue } = require("lib");

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const solve = (data, depth) => {
  const queue = new Queue();

  {
    let state = "";
    {
      let grid = data.split(/\r?\n/g).map((row) => row.split(""));
      state += ".. . . . ..";
      for (let i = 3; i < 10; i += 2) {
        state += ",";
        for (let j = 0; j < depth; j++) {
          const e = grid[2 + j][i];
          if (e === ".") continue;
          state += grid[2 + j][i];
        }
      }
    }
    queue.enqueue([state, 0]);
  }

  const map = new Map();
  const types = ["A", "B", "C", "D"];
  const costs = { A: 1, B: 10, C: 100, D: 1000 };
  const regex = types.map((e) => new RegExp(`^${e}*$`));
  let min = Infinity;

  const toHome = (cost, hall, stacks, I) => {
    if (stacks[I].length === depth) return;
    const amphipod = types[I];
    const depthCost = (depth - stacks[I].length) * costs[amphipod];

    const explore = (dir) => {
      let i = I * 2 + 2,
        c = 0;
      while (true) {
        i += dir;
        c += costs[amphipod];
        const H = hall[i];
        if (H === " " || H === ".") continue;
        if (H === undefined || H !== amphipod) break;
        const nCost = cost + depthCost + c;
        if (nCost > min) break;
        const nHall = setCharAt(hall, i, ".");
        const nStacks = [...stacks];
        nStacks[I] += amphipod;
        const nState = [nHall, ...nStacks].join(",");
        queue.enqueue([nState, nCost]);
        break;
      }
    };
    explore(1);
    explore(-1);
  };

  const fromHome = (cost, hall, stacks, I) => {
    if (!stacks[I].length) return;
    const amphipod = stacks[I][0];
    const depthCost = (depth - stacks[I].length + 1) * costs[amphipod];

    const explore = (dir) => {
      let i = I * 2 + 2,
        c = 0;
      while (true) {
        i += dir;
        c += costs[amphipod];
        const H = hall[i];
        if (H === " ") continue;
        if (H === ".") {
          const nCost = cost + depthCost + c;
          if (nCost > min) break;
          const nHall = setCharAt(hall, i, amphipod);
          const nStacks = [...stacks];
          nStacks[I] = nStacks[I].slice(1);
          const nState = [nHall, ...nStacks].join(",");
          queue.enqueue([nState, nCost]);
          continue;
        }
        break;
      }
    };
    explore(-1);
    explore(1);
  };

  while (true) {
    const node = queue.dequeue();
    if (!node) break;
    const [hash, cost] = node;
    if (map.get(hash) <= cost) continue;
    map.set(hash, cost);
    const [hall, ...stacks] = hash.split(",");
    if (
      /^(\.| )*$/.test(hall) &&
      stacks.every((stack, i) => regex[i].test(stack))
    ) {
      if (min > cost) min = cost;
      continue;
    }

    for (let i = 0; i < stacks.length; i++) {
      if (regex[i].test(stacks[i])) {
        toHome(cost, hall, stacks, i);
        continue;
      }
      fromHome(cost, hall, stacks, i);
    }
  }

  return min;
};

consoleTime(() => solve(input("dataA.txt"), 2));
consoleTime(() => solve(input("dataB.txt"), 4));
