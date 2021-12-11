document.body.innerHTML = "";
document.body.style.backgroundColor = "#2e3440";
const c = document.createElement("canvas");
document.body.appendChild(c);
const ctx = c.getContext("2d");

const data = `2478668324
4283474125
1663463374
1738271323
4285744861
3551311515
8574335438
7843525826
1366237577
3554687226`
  .split("\n")
  .map((row) => row.split("").map(Number));

const fillStyle = [...Array(10).keys()].map(
  (e) => `rgba(237,203,135,${e / 10})`
);
fillStyle[0] = `rgba(237,203,135,1)`;

function flash(
  matrix,
  i,
  j,
  neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ]
) {
  if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) return 0;
  matrix[i][j]++;
  if (matrix[i][j] !== 10) return 0;
  return (
    1 +
    neighbors.reduce((acc, [di, dj]) => acc + flash(matrix, i + di, j + dj), 0)
  );
}

async function wait(time = 100) {
  return new Promise((res) => setTimeout(res, time));
}

c.width = window.innerWidth;
c.height = window.innerHeight;

var font_size = 16;
ctx.font = font_size + "px courier";
ctx.shadowColor = "#a2bf89";

async function draw() {
  let step = 0,
    count = 0,
    all = true;
  main: while (true) {
    ctx.fillStyle = "#2e3440";
    ctx.fillRect(0, 0, c.width, c.height);

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        count += flash(data, i, j);
      }
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] > 9) {
          data[i][j] = 0;
          continue;
        }
        all = false;
      }
    }
    step++;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        ctx.fillStyle = fillStyle[data[i][j]];
        if (data[i][j] === 0) {
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillText(data[i][j], j * font_size, (i + 1) * font_size);
      }
    }
    await wait();
    if (all === true) return step;
    all = true;
  }
}

draw();
