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
      patternString = fs.readFileSync(file, 'utf8')
    } catch (e) {
      console.log(e);
    }
    this.patternRle = patternString;
    this.parseRle();
  }

  parseRle() {
    const rle= new RLE;
    this.cells = rle.parse(this.patternRle);
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
    const cellRows = this.cells.split('\n');
    for (var i=0; i<rows; i++) {
      const cellRow = cellRows[i];
      for (var j=0; j<cellRow.length; j++) {
        const cell = cellRow[j];
        if (cell === '0') {
          this.board[i][j] = 'O';
        }
      }
    }
  }

  extractDimensions() {
    const stringArray = this.patternRle.split(" ");
    const numerics = [];
    for (var i=0; i<stringArray.length; i++) {
      const numeric = stringArray[i].match(/\d+/);
      if (numeric !== null) {
        numerics.push(parseInt(numeric[0]));
      }
    }
    this.width = numerics[0];
    this.height = numerics[1];
  }

  getBoardString() {
    var boardString = "";
    for (var i = 0; i < this.height; i++) {
      var row = this.board[i].join("");
      boardString += row + "\n";
    }
    return boardString;
  }

}
