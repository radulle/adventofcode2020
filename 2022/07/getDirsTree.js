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
    {
      const dirName = /^\$ cd (.+)/.exec(line)?.[1];

      if (dirName === "/") {
        pwd = root;
        continue;
      }

      if (dirName === "..") {
        pwd = pwd.parent;
        continue;
      }

      if (dirName) {
        let child = pwd.children.find((e) => e.name === dirName);
        if (!child) pwd.children.push((child = new Node(dirName, pwd)));
        pwd = child;
        continue;
      }
    }

    const size = +/^(\d+)/.exec(line)?.[1];
    if (size)
      (function r(dir) {
        dir.size += size;
        if (dir.parent) r(dir.parent);
      })(pwd);
  }

  return root;
};
