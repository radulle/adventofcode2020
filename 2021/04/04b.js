const { input, consoleTime } = require("lib");

const data = input();

const GRID_SIZE = 5;
const GRID_ELEMENTS = GRID_SIZE ** 2;

const getTicket = (j) => Math.floor(j / GRID_ELEMENTS);

const getHorizontal = (j) =>
  Array(GRID_SIZE)
    .fill(Math.floor(j / GRID_SIZE) * GRID_SIZE)
    .map((e, i) => e + i);

const getVertical = (j) =>
  Array(GRID_SIZE)
    .fill(
      (() => {
        let k = j;
        while (k - 5 >= getTicket(j) * GRID_ELEMENTS) {
          k -= 5;
        }
        return k;
      })()
    )
    .map((e, i) => e + i * 5);

consoleTime(() => solve(data));

function solve(data) {
  const drum = data.substring(0, data.indexOf("\n")).split(",").map(Number);
  const ticketsNumbers = data
    .substring(data.indexOf("\n"))
    .match(/\d+/g)
    .map(Number);

  const ticketsCount = ticketsNumbers.length / GRID_ELEMENTS;
  const winningTickets = new Set();

  let ticket, picked, j;

  round: for (let i = 0; i < drum.length; i++) {
    picked = drum[i];
    j = 0;
    while (j < ticketsNumbers.length) {
      ticket = getTicket(j);
      if (!winningTickets.has(ticket)) {
        if (ticketsNumbers[j] === picked) {
          ticketsNumbers[j] = null;
          if (
            getHorizontal(j).every((e) => ticketsNumbers[e] === null) ||
            getVertical(j).every((e) => ticketsNumbers[e] === null)
          ) {
            if (winningTickets.size === ticketsCount - 1) break round;
            winningTickets.add(ticket);
          }
        }
        j++;
      } else {
        j = Math.floor((j + GRID_ELEMENTS) / GRID_ELEMENTS) * GRID_ELEMENTS;
      }
    }
  }

  return (
    picked *
    ticketsNumbers
      .slice(ticket * GRID_ELEMENTS, (ticket + 1) * GRID_ELEMENTS)
      .reduce((acc, cur) => acc + cur, 0)
  );
}
