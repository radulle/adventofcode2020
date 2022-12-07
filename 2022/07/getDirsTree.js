const { input } = require("lib");

exports.getDirsTree = function getDirsTree() {
  const data = input().split("\n");

  class Node {
    constructor(name, parent) {
      this.name = name;
      this.size = 0;
      this.children = [];
      this.parent = parent;
    }
  }

  const root = new Node("", null);

  let pwd = root;

  for (const line of data) {
    if (line === "$ cd /") {
      pwd = root;
      continue;
    }
    if (line === "$ cd ..") {
      pwd = pwd.parent;
      continue;
    }
    if (/^\$ cd (.+)/.test(line)) {
      const dirName = /^\$ cd (.+)/.exec(line)[1];
      if (pwd.children.every((e) => e.name !== dirName))
        pwd.children.push(new Node(dirName, pwd));
      pwd = pwd.children.find((e) => e.name === dirName);
      continue;
    }
    if (line === "$ ls") continue;
    if (/^dir/.test(line)) continue;
    const size = +/^(\d+)/.exec(line)[1];
    (function r(dir) {
      dir.size += size;
      if (dir.parent) r(dir.parent);
    })(pwd);
  }
  return root;
};
