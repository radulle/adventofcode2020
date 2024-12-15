const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const list = [];
  const re = /(\d+),(\d+).+?(-?\d+),(-?\d+)/g;
  let item;
  while ((item = re.exec(input))) list.push(item.slice(1).map(Number));
  return list;
}

function process(robots) {
  const Y = 103;
  const X = 101;
  const s = 100;
  const midX = Math.ceil(X / 2) - 1;
  const midY = Math.ceil(Y / 2) - 1;

  const quadrants = [0,0,0,0];
  for (const robot of robots) {
    robot[0] = (((robot[0] + robot[2] * s) % X) + X) % X;
    robot[1] = (((robot[1] + robot[3] * s) % Y) + Y) % Y;
    if(robot[0] === midX ) continue;
    if(robot[1] === midY ) continue;
    if(robot[0] <midX && robot[1] < midY) quadrants[0]++;
    if(robot[0] >midX && robot[1] < midY) quadrants[1]++;
    if(robot[0] <midX && robot[1] > midY) quadrants[2]++;
    if(robot[0] >midX && robot[1] > midY) quadrants[3]++;
  }

  return quadrants.reduce((acc, q) => acc * q, 1);
}