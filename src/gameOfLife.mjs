import fs from "fs";
import { parse } from "path";
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
    const stringArray = this.patternRle.split(" ");
    const numerics = [];
    for (var i = 0; i < stringArray.length; i++) {
      const numeric = stringArray[i].match(/\d+/);
      if (numeric !== null) {
        numerics.push(parseInt(numeric[0]));
      }
    }
    this.width = numerics[0];
    this.height = numerics[1];
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
        const a = {x: i - 1, y:j - 1};
        const b = {x: i - 1, y:j};
        const c = {x: i - 1, y:j + 1};
        const d = {x:i, y:j + 1};

        const e = {x:i + 1, y:j + 1};
        const f = {x:i + 1, y:j};
        const g = {x:i + 1, y:j - 1};
        const h = {x:i, y:j - 1};
        const neighbors = [a,b,c,d,e,f,g,h];
        for (var k=0; k<8; k++) {
          const neighbor = neighbors[k];
          if (this.isOnTheBoard(neighbor)) {
            if (this.board[neighbor.x][neighbor.y] === 'O') {
              alive +=1;
            }
          }
        }
        newBoard = this.checkAndChangeCell(i, j, alive, newBoard);
      }
    }
    this.board = JSON.parse(JSON.stringify(newBoard))
  }

  checkAndChangeCell(i, j, alive, newBoard) {
    if (this.board[i][j] === 'O') {
      if (alive <  2 || alive > 3) {
        newBoard[i][j] = '.';
      }
    } else {
      if (alive === 3) {
        newBoard[i][j] ='O';
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
}
