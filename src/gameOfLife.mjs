import fs from "fs";
import RLE from "RLE-parser";

export class GameOfLife {
  patternRle;
  patternFileName;
  cells;
  width;
  height;

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

  getRle() {
    return this.patternRle;
  }

  getCells() {
    return this.cells;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  parseRle() {
    const rle= new RLE;
    this.cells = rle.parse(this.patternRle);
  }

  convertToArray() {

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

}
