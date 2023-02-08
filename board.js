import mazeOneCoords from "./mazeOneCoords.js";
import mazeTwoCoords from "./mazeTwoCoords.js";
import styleChanges from "./pageChanges.js";

let isLMBDown = false;
let isLMBDownStart = false;
let isLMBDownEnd = false;

document.addEventListener("mousedown", () => (isLMBDown = true));
document.addEventListener("mouseup", () => (isLMBDown = false));

const NodeType = {
  unvisited: "unvisited",
  start: "start",
  end: "end",
  wall: "wall",
  short: "short",
  visited: "visited",
};

class Node {
  constructor(status, row, col) {
    this.status = status;
    this.row = row;
    this.col = col;
    this.previousNode = null;
  }

  addToPreviousNode(previousNode) {
    this.previousNode = previousNode;
  }

  makeWall() {
    if (this.status !== NodeType.start || this.status !== NodeType.end) {
      this.status = NodeType.wall;
      let node = document.getElementById(`${this.row}-${this.col}`);
      node.classList.remove(NodeType.unvisited);
      node.classList.add(this.status);
    }
  }

  makeUnvisited() {
    this.status = NodeType.unvisited;
    let node = document.getElementById(`${this.row}-${this.col}`);
    node.classList.remove(NodeType.wall);
    node.classList.remove(NodeType.short);
    node.classList.remove(NodeType.visited);
    node.classList.add(this.status);

    if (node.classList.contains(NodeType.start) || node.classList.contains(NodeType.end)) {
      node.classList.remove(NodeType.unvisited);
    }
  }

  makeStart() {
    this.status = NodeType.start;
    let node = document.getElementById(`${this.row}-${this.col}`);
    node.classList.remove(NodeType.unvisited);
    node.classList.add(this.status);
  }

  makeEnd() {
    this.status = NodeType.end;
    let node = document.getElementById(`${this.row}-${this.col}`);
    node.classList.remove(NodeType.unvisited);
    node.classList.add(this.status);
  }

  removeStart() {
    this.status = NodeType.unvisited;
    let node = document.getElementById(`${this.row}-${this.col}`);
    if (node.classList.contains(NodeType.start)) {
      node.classList.remove(NodeType.start);
      node.classList.add(this.status);
    }
  }

  removeEnd() {
    this.status = NodeType.unvisited;
    let node = document.getElementById(`${this.row}-${this.col}`);
    if (node.classList.contains(NodeType.end)) {
      node.classList.remove(NodeType.end);
      node.classList.add(this.status);
    }
  }

  removeUnvisited() {
    this.status = NodeType.unvisited;
    let node = document.getElementById(`${this.row}-${this.col}`);
    if (node.classList.contains(NodeType.wall) && node.classList.contains(NodeType.start) && node.classList.contains(NodeType.end)) {
      node.classList.remove(this.status);
    }
  }

  makeVisited() {
    this.status = NodeType.visited;
    let node = document.getElementById(`${this.row}-${this.col}`);
    if (node.classList.contains(NodeType.unvisited)) {
      node.classList.remove(NodeType.unvisited);
      node.classList.add(this.status);
    }
  }

  makeShort() {
    this.status = NodeType.short;
    let node = document.getElementById(`${this.row}-${this.col}`);
    if (node.classList.contains(NodeType.visited)) {
      node.classList.add(this.status);
      node.classList.remove(NodeType.visited);
    }
  }
}

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.start = null;
    this.end = null;
    this.grid = [];

    for (let r = 0; r < this.height; r++) {
      let row = [];
      for (let c = 0; c < this.width; c++) {
        let node = new Node(NodeType.unvisited, r, c);
        row.push(node);
      }
      this.grid.push(row);
    }
  }

  drawBoard() {
    let tableHTML = "";
    for (let r = 0; r < this.height; r++) {
      let currentRow = `<tr id="row-${r}">`;
      for (let c = 0; c < this.width; c++) {
        if (r === Math.floor(this.height / 2) && c === Math.floor(this.width / 4)) {
          this.grid[r][c].status = NodeType.start;
        } else if (r === Math.floor(this.height / 2) && c === Math.floor((3 * this.width) / 4)) {
          this.grid[r][c].status = NodeType.end;
        }
        currentRow += `<td id="${r}-${c}" class="${this.grid[r][c].status}"></td>`;
      }
      tableHTML += `${currentRow}</tr>`;
    }
    document.querySelector(".table-grid").innerHTML = tableHTML;
    this.start = this.grid[7][13];
    this.end = this.grid[7][40];
  }

  addEventListeners() {
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        document.getElementById(`${r}-${c}`).addEventListener("mouseenter", () => {
          if (isLMBDown && !isLMBDownStart && !isLMBDownEnd) {
            if (this.grid[r][c].status === NodeType.unvisited) {
              this.grid[r][c].makeWall();
            }
          } else if (isLMBDownStart) {
            this.grid[r][c].makeStart();
            this.start = this.grid[r][c];
          } else if (isLMBDownEnd) {
            this.grid[r][c].makeEnd();
            this.end = this.grid[r][c];
          }
        });

        document.getElementById(`${r}-${c}`).addEventListener("mouseleave", () => {
          if (isLMBDownStart) {
            this.grid[r][c].removeStart();
          } else if (isLMBDownEnd) {
            this.grid[r][c].removeEnd();
          }
        });

        if (this.grid[r][c].status !== NodeType.end && this.grid[r][c].status !== NodeType.start) {
          document.getElementById(`${r}-${c}`).addEventListener("click", () => {
            if (!isLMBDownStart) {
              this.grid[r][c].makeUnvisited();
            } else if (!isLMBDownEnd) {
              this.grid[r][c].makeUnvisited();
            }
          });
        }
      }
    }
  }

  clearBoard() {
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        this.grid[r][c].makeUnvisited();
        this.grid[r][c].removeStart();
        this.grid[7][13].makeStart();
        this.grid[r][c].removeEnd();
        this.grid[7][40].makeEnd();
      }
    }
  }

  createMazeOne() {
    this.clearBoard();
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        if (r === 0 || r === 14 || c === 0 || c === 53 || r === 4) {
          this.grid[4][15].makeUnvisited();
          this.grid[r][c].makeWall();
        }
        for (let i = 0; i < mazeOneCoords.length; i++) {
          if (mazeOneCoords[i] === `${r}-${c}`) {
            this.grid[r][c].makeWall();
            this.grid[r][c].removeUnvisited();
            this.grid[r][c].status = NodeType.wall;
          }
        }
        if (this.grid[r][c].status === NodeType.start) {
          this.grid[r][c].removeStart();
          this.grid[13][1].makeStart();
          this.start = this.grid[13][1];
        }
        if (this.grid[r][c].status === NodeType.end) {
          this.grid[r][c].removeEnd();
          this.grid[5][49].makeEnd();
          this.end = this.grid[5][49];
        }
      }
    }
  }

  createMazeTwo() {
    this.clearBoard();

    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        if (r === 0 || r === 2 || r === 4 || r === 6 || r === 8 || r === 10 || r === 12 || r === 14 || c === 53 || c === 0) {
          this.grid[r][c].makeWall();
        }
        for (let i = 0; i < mazeTwoCoords.length; i++) {
          if (mazeTwoCoords[i] === `${r}-${c}`) {
            this.grid[r][c].makeUnvisited();
            this.grid[3][38].makeWall();
            this.grid[3][48].makeWall();
            this.grid[3][50].makeWall();
            this.grid[7][12].makeWall();
            this.grid[7][50].makeWall();
            this.grid[9][28].makeWall();
            this.grid[9][34].makeWall();
            this.grid[13][50].makeWall();
          }
        }
        if (this.grid[r][c].status === NodeType.start) {
          this.grid[r][c].removeStart();
          this.grid[13][1].makeStart();
          this.start = this.grid[13][1];
        }

        if (this.grid[r][c].status === NodeType.end) {
          this.grid[r][c].removeEnd();
          this.grid[1][1].makeEnd();
          this.end = this.grid[1][1];
        }
      }
    }
  }

  checkBounds(row, col) {
    if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
      return false;
    }
    return true;
  }

  async algorithmBFS() {
    let directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    let queue = [];
    const visitedNodes = new Set();
    queue.push(this.start);

    while (queue.length > 0) {
      await new Promise((t) => setTimeout(t, algoSpeed));
      let current = queue.shift();
      current.makeVisited();
      let rowC = parseInt(current.row);
      let colC = parseInt(current.col);
      visitedNodes.add(`${rowC}-${colC}`);

      if (current === this.end) {
        const path = [];
        while (current.col !== this.start.col || current.row !== this.start.row) {
          path.unshift(current);
          current = current.previousNode;
        }
        this.drawShortestPath(path);
        break;
      }

      for (let direction of directions) {
        let currentRow = rowC + direction[0];
        let currentCol = colC + direction[1];
        if (this.checkBounds(currentRow, currentCol) && !visitedNodes.has(`${currentRow}-${currentCol}`)) {
          let node = this.grid[currentRow][currentCol];
          node.addToPreviousNode(current);
          if (node.status === NodeType.wall) continue;
          queue.push(node);
          visitedNodes.add(`${currentRow}-${currentCol}`);
        }
      }
    }
  }

  async algorithmDFS() {
    let directions = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];
    let stack = [];
    const visitedNodes = new Set();
    stack.push(this.start);
    while (stack.length > 0) {
      await new Promise((t) => setTimeout(t, 20));
      let current = stack.pop();
      current.makeVisited();
      let rowC = parseInt(current.row);
      let colC = parseInt(current.col);
      if (current === this.end) {
        const path = [];
        while (current.col !== this.start.col || current.row !== this.start.row) {
          path.unshift(current);
          current = current.previousNode;
        }
        this.drawShortestPath(path);
        break;
      }
      visitedNodes.add(`${rowC}-${colC}`);
      for (let direction of directions) {
        let currentRow = rowC + direction[0];
        let currentCol = colC + direction[1];
        if (this.checkBounds(currentRow, currentCol) && !visitedNodes.has(`${currentRow}-${currentCol}`)) {
          let node = this.grid[currentRow][currentCol];
          node.addToPreviousNode(current);
          if (node.status === NodeType.wall) continue;
          stack.push(node);
        }
      }
    }
  }

  drawShortestPath(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        path[i].makeShort();
      }, 100 * i);
    }
  }

  changeSpeed() {
    if (document.querySelector(".speeds").innerHTML === "Speed: Average") {
      algoSpeed = 50;
    } else if (document.querySelector(".speeds").innerText === "Speed: Slow") {
      algoSpeed = 200;
    } else if (document.querySelector(".speeds").innerText === "Speed: Fast") {
      algoSpeed = 5;
    }
  }
}

let newBoard = new Board(54, 15);
document.querySelector(".reset-board").addEventListener("click", () => newBoard.clearBoard());
newBoard.drawBoard();
newBoard.addEventListeners();
let algoSpeed = 5;

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.length > 0 && e.target.classList[0] === NodeType.start) {
    isLMBDownStart = true;
    let id = e.target.id;
    id = id.split("-");
    let row = id[0];
    let col = id[1];
    newBoard.grid[row][col].removeStart();
  } else if (e.target.classList.length > 0 && e.target.classList[0] === NodeType.end) {
    isLMBDownEnd = true;
    let id = e.target.id;
    id = id.split("-");
    let row = id[0];
    let col = id[1];
    newBoard.grid[row][col].removeEnd();
  }
});

document.addEventListener("mouseup", (e) => {
  if (isLMBDownStart) {
    isLMBDownStart = false;
    if (e.target.classList.length > 0 && e.target.classList[0] === NodeType.unvisited) {
      let id = e.target.id;
      id = id.split("-");
      let row = id[0];
      let col = id[1];
      newBoard.grid[row][col].makeStart();
    }
  }
  if (isLMBDownEnd) {
    isLMBDownEnd = false;
    if (e.target.classList.length > 0 && e.target.classList[0] === NodeType.unvisited) {
      let id = e.target.id;
      id = id.split("-");
      let row = id[0];
      let col = id[1];
      newBoard.grid[row][col].makeEnd();
    }
  }
});

styleChanges(newBoard);
