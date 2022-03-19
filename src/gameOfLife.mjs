import fs from "fs";
import RLE from "RLE-parser";

export class GameOfLife {
  patternRle;
  patternFileName;
  cells;

  constructor(patternFile) {
    this.patternRle = "";
    this.patternFileName = patternFile;
    this.cells = "";
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
    return patternString;
  }

  getRle() {
    return this.patternRle;
  }

  getCells() {
    return this.cells;
  }

  parseRle() {
    const rle= new RLE;
    this.cells = rle.parse(this.patternRle);
  }

}
