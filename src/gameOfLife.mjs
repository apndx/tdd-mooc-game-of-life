import fs from "fs";
import RLE from "RLE-parser";

export class GameOfLife {
  patternRle;
  patternFileName;
  cells;
  width;
  height;
  board;

  constructor(patternFile) {
    this.patternRle = "";
    this.patternFileName = patternFile;
    this.cells = "";
    this.width = 0;
    this.height = 0;
  }

  async initialize() {
    const file = this.patternFileName;
    var patternString = "";
    try {
      patternString = fs.readFileSync(file, "utf8");
    } catch (e) {
      console.log(e);
    }
    this.patternRle = patternString;
    this.parseRle();
    this.extractDimensions();
    this.makeBoardArray();
    this.convertToArray();
  }

  parseRle() {
    const rle = new RLE();
    this.cells = rle.parse(this.patternRle);
  }
  
  extractDimensions() {
    const width = this.patternRle.match(/x\s=\s\d+/)[0];
    const height = this.patternRle.match(/y\s=\s\d+/)[0];
    const numWidth = width.match(/\d+/);
    const numHeight = height.match(/\d+/);
    this.width = parseInt(numWidth[0]);
    this.height = parseInt(numHeight[0]);
  }

  makeBoardArray = () => {
    var row = [];
    var board = [];
    for (var j = 0; j < this.height; j++) {
      for (var i = 0; i < this.width; i++) {
        row.push(".");
      }
      board[j] = row;
      row = [];
    }
    this.board = board;
  };

  convertToArray() {
    const rows = this.height;
    const cellRows = this.cells.split("\n");
    for (var i = 0; i < rows; i++) {
      const cellRow = cellRows[i];
      for (var j = 0; j < cellRow.length; j++) {
        const cell = cellRow[j];
        if (cell === "0") {
          this.board[i][j] = "O";
        }
      }
    }
  }

  getBoardString() {
    var boardString = "";
    for (var i = 0; i < this.height; i++) {
      var row = this.board[i].join("");
      boardString += row + "\n";
    }
    return boardString;
  }

  tick() {
    // check neighbors on each tick
    // a b c
    // h   d
    // g f e
    const row = this.height;
    const col = this.width;
    var newBoard = JSON.parse(JSON.stringify(this.board));
    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        var alive = 0;
        const a = { x: i - 1, y: j - 1 };
        const b = { x: i - 1, y: j };
        const c = { x: i - 1, y: j + 1 };
        const d = { x: i, y: j + 1 };

        const e = { x: i + 1, y: j + 1 };
        const f = { x: i + 1, y: j };
        const g = { x: i + 1, y: j - 1 };
        const h = { x: i, y: j - 1 };
        const neighbors = [a, b, c, d, e, f, g, h];
        for (var k = 0; k < 8; k++) {
          const neighbor = neighbors[k];
          if (this.isOnTheBoard(neighbor)) {
            if (this.board[neighbor.x][neighbor.y] === "O") {
              alive += 1;
            }
          }
        }
        newBoard = this.checkAndChangeCell(i, j, alive, newBoard);
      }
    }
    this.board = JSON.parse(JSON.stringify(newBoard));
  }

  checkAndChangeCell(i, j, alive, newBoard) {
    if (this.board[i][j] === "O") {
      if (alive < 2 || alive > 3) {
        newBoard[i][j] = ".";
      }
    } else {
      if (alive === 3) {
        newBoard[i][j] = "O";
      }
    }
    return newBoard;
  }

  isOnTheBoard(coordinates) {
    return (
      coordinates.x > -1 &&
      coordinates.x < this.height &&
      coordinates.y > -1 &&
      coordinates.y < this.width
    );
  }

  parseRleCell(cell, counter) {
    if (counter === 0) {
      return "";
    } else {
      return cell === "." ? "b" : "o";
    }
  }

  parseOutputRle() {
    // parse the output file starting from the bottom and end of row
    var outputRle = "!\n";
    var previous = "";
    var counter = 0;
    for (var i = this.height - 1; i > -1; i--) {
      for (var j = this.width - 1; j > -1; j--) {
        const current = this.board[i][j];
        if (current === "O" && previous !== ".") {
          counter += 1;
          previous = "O";
        } else if (current === "O" && previous === ".") {
          outputRle = counter + "b" + outputRle;
          counter = 1;
          previous = "O";
        } else if (current === "." && previous === ".") {
          counter += 1;
          previous = ".";
        } else if (current === "." && previous === "O") {
          outputRle = counter + "o" + outputRle;
          counter = 1;
          previous = ".";
        } else if (current === "." && previous === "e") {
          counter += 1;
          previous = ".";
        }
        if (j === 0 && counter !== 0 && i > 0) {
          outputRle = "$" + counter + this.parseRleCell(current, counter) + outputRle;
        } else if (j === 0 && counter !== 0 && i === 0) {
          outputRle = counter + this.parseRleCell(current, counter) + outputRle;
        }
      }
      counter = 0;
      previous = "e";
    }
    if (outputRle.charAt(0) === '$') {
      outputRle = outputRle.replace("$", "");
    }
      return this.parseHeader() + outputRle;
  }

  parseHeader() {
    const originalRleRows = this.patternRle.split("\n");
    var header = "";
    for (var i = 0; i < originalRleRows.length; i++) {
      const headerRow = originalRleRows[i].charAt(0).match(/#|x/);
      if (headerRow !== null) {
        header = header + originalRleRows[i] + "\n";
      } else {
        break;
      }
    }
    return header;
  }

}

export function play(file, iterations) {
  var gameOfLife = new GameOfLife(file);
  gameOfLife.initialize();
  var ticksLeft = iterations;
  while (ticksLeft > 0) {
    gameOfLife.tick();
    ticksLeft -= 1;
  }
  //return gameOfLife.getBoardString();
  const output = gameOfLife.parseOutputRle();
  return output;
}

if (process.argv.length > 2) {
  const fileName = process.argv[2];
  const iterations = Number(process.argv[3]);
  const filePath = `./${fileName}`;
  console.log(play(filePath, iterations));
}
