const { input } = require("lib");

exports.getDirs = function getDirs() {
  const data = input().split("\n");

  const dirs = { "": 0 };

  let pwd = [];

  for (const line of data) {
    if (line === "$ cd /") {
      pwd.length = 0;
      continue;
    }
    if (line === "$ cd ..") {
      pwd.pop();
      continue;
    }
    if (/^\$ cd (.+)/.test(line)) {
      const dir = /^\$ cd (.+)/.exec(line)[1];
      pwd.push(dir);
      dirs[pwd.join("/")] = dirs[pwd.join("/")] || 0;
      continue;
    }
    if (line === "$ ls") continue;
    if (/^dir/.test(line)) continue;
    const size = +/^(\d+)/.exec(line)[1];
    for (const key in dirs) {
      if (pwd.join("/").includes(key)) dirs[key] += size;
    }
  }
  return dirs;
};
