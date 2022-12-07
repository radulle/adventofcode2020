const { consoleTime } = require("lib");
const { getDirsTree } = require("./getDirsTree");

consoleTime(() => solve());

function solve() {
  const root = getDirsTree();

  let result = 0;

  (function r(dir) {
    if (dir.size < 100_000) result += dir.size;
    for (const child of dir.children) {
      r(child);
    }
  })(root);

  console.info(result);
}
