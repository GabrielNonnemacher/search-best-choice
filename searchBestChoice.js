const { performance } = require('perf_hooks');

const SIZE = 4;
const GOAL = [
  1, 2, 3, 4,
  5, 6, 7, 8,
  9, 10, 11, 12,
  13, 14, 15, 0
];

function boardToString(board) {
  return board.join(",");
}

function getNeighbors(board) {
  const neighbors = [];
  const zeroIndex = board.indexOf(0);

  const row = Math.floor(zeroIndex / SIZE);
  const col = zeroIndex % SIZE;

  const moves = [
    { dr: -1, dc: 0, name: "UP" },
    { dr: 1, dc: 0, name: "DOWN" },
    { dr: 0, dc: -1, name: "LEFT" },
    { dr: 0, dc: 1, name: "RIGHT" }
  ];

  for (const move of moves) {
    const newRow = row + move.dr;
    const newCol = col + move.dc;

    if (newRow >= 0 && newRow < SIZE && newCol >= 0 && newCol < SIZE) {
      const newBoard = [...board];
      const newIndex = newRow * SIZE + newCol;

      // swap
      const temp = newBoard[zeroIndex];
      newBoard[zeroIndex] = newBoard[newIndex];
      newBoard[newIndex] = temp;

      neighbors.push({
        board: newBoard,
        move: move.name
      });
    }
  }

  return neighbors;
}

function reconstructPath(node) {
  const path = [];

  while (node.parent !== null) {
    path.push(node.move);
    node = node.parent;
  }

  return path.reverse();
}

function manhattan(board, goal) {
  let dist = 0;

  for (let i = 0; i < board.length; i++) {
    const value = board[i];
    if (value === 0) continue;

    const goalIndex = goal.indexOf(value);

    const x1 = Math.floor(i / SIZE);
    const y1 = i % SIZE;

    const x2 = Math.floor(goalIndex / SIZE);
    const y2 = goalIndex % SIZE;

    dist += Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  return dist;
}

function aStar(start, goal = GOAL) {
  const open = [];
  const visited = new Set();

  open.push({
    board: start,
    parent: null,
    move: null,
    g: 0,
    h: manhattan(start, goal),
    f: 0
  });

  open[0].f = open[0].g + open[0].h;

  let nodesVisited = 0;

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);

    const current = open.shift();
    const key = boardToString(current.board);

    if (visited.has(key)) continue;
    visited.add(key);

    nodesVisited++;

    if (key === boardToString(goal)) {
      return {
        path: reconstructPath(current),
        nodesVisited
      };
    }

    for (const neighbor of getNeighbors(current.board)) {
      const g = current.g + 1;
      const h = manhattan(neighbor.board, goal);

      open.push({
        board: neighbor.board,
        parent: current,
        move: neighbor.move,
        g,
        h,
        f: g + h
      });
    }
  }

  return null;
}

function logAStar(start) {
  console.log('\n');
  const startTime = performance.now();
  const result = aStar(start);
  const endTime = performance.now();
  const duration = endTime - startTime;

  if (result) {
    console.log("Solução:", result.path);
    console.log('-------------------------------------');
    console.log("Nós visitados:", result.nodesVisited);
  } else {
    console.log("Sem solução");
  }

  console.log('-------------------------------------');
  console.log("Tempo de execução:", duration.toFixed(2), "ms");
}

const startA = [
    5, 1, 3, 4,
    9, 0, 6, 8,
    13, 2, 7, 12,
    14, 10, 11, 15
];
const startB = [
    1, 2, 4, 8,
    7, 10, 3, 11,
    5, 13, 6, 15,
    9, 0, 14, 12
];

logAStar(startA);
logAStar(startB);
