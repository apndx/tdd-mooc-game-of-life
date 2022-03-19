import { eachLine } from "line-reader";
import fs from "fs";

export class GameOfLife {
  patternRle;
  patternFileName;

  constructor(patternFile) {
    this.pattern = "";
    this.patternFileName = patternFile;
  }

  async initialize() {
    const file = this.patternFileName;
    var patternString = "";
    try {
      patternString = fs.readFileSync(file, 'utf8')
    } catch (e) {
      console.log(e);
    }
    console.log('final',patternString)
    console.log('this', this.toString())
    this.pattern = patternString;
    return patternString;
  }


  toString() {
    return this.pattern;
  }
}
