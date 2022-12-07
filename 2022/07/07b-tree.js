const { consoleTime } = require("lib");
const { getDirsTree } = require("./getDirsTree");

consoleTime(() => solve());

function solve() {
  const root = getDirsTree();

  const free = 70_000_000 - root.size;
  const missing = 30_000_000 - free;

  let min = Infinity;

  (function r(dir) {
    if (dir.size > missing && dir.size < min) min = dir.size;
    for (const child of dir.children) {
      r(child);
    }
  })(root);

  console.info(min);
}
