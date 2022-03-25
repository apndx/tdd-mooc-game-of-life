import { expect } from "chai";
import { GameOfLife, play } from "../src/gameOfLife.mjs";

describe("An RLE file", () => {
  const gameOfLife = new GameOfLife("./glider.rle");

  it("can be used to read a pattern", () => {
    gameOfLife.initialize();
    const rle = gameOfLife.patternRle;
    expect(rle).to.equal(`#C This is a glider.\nx = 3, y = 3\nbo$2bo$3o!\n`);
  });

  it("can be used to convert a pattern to a cell presentation", () => {
    const cells = gameOfLife.cells;
    expect(cells).to.equal(` 0\n  0\n000\n`);
  });

  it("can be used to find dimensions of the game board", () => {
    const width = gameOfLife.width;
    const height = gameOfLife.height;
    expect(width).to.equal(3);
    expect(height).to.equal(3);
  });

  it("can be used to convert a pattern to a game board array", () => {
    const cells = gameOfLife.getBoardString();
    expect(cells).to.equalShape(
      `.O.
       ..O
       OOO`
    );
  });
});

describe("An RLE file", () => {
  const gameOfLife = new GameOfLife("./1beacon.rle");

  it("can have variable length header", () => {
    gameOfLife.initialize();
    const rle = gameOfLife.patternRle;
    expect(rle).to.equal(`#N 1 beacon\r\n#C Approximately the 32nd-most common oscillator.\r\n#C www.conwaylife.com/wiki/index.php?title=1_beacon\r\nx = 7, y = 7, rule = b3/s23\r\n2b2o3b$bobo3b$o2bob2o$2obo2bo$bobo3b$bo2bo2b$2b2o!`);
  });

  it("with multiline comment can be used to convert a pattern to a cell presentation", () => {
    const cells = gameOfLife.cells;
    expect(cells).to.equal(`  00   \n 0 0   \n0  0 00\n00 0  0\n 0 0   \n 0  0  \n  00\n`);
  });

  it("with multiline comment can be used to find dimensions of the game board", () => {
    const width = gameOfLife.width;
    const height = gameOfLife.height;
    expect(width).to.equal(7);
    expect(height).to.equal(7);
  });

});



describe("When game of life is started", () => {
  const gameOfLife = new GameOfLife("./blinker.rle");

  it("in the beginning the blinker shape is as it is in the input file", () => {
    gameOfLife.initialize();
    const pattern = gameOfLife.getBoardString();
    expect(pattern).to.equalShape(
      `.O.
       .O.
       .O.`
    );
  });

  it("after one iteration the blinker pattern changes according to game of life rules", () => {
    gameOfLife.tick();
    const pattern = gameOfLife.getBoardString();
    expect(pattern).to.equalShape(
      `...
       OOO
       ...`
    );
  });
});

describe("When the blinker rle file and iterations amount 3 are given", () => {
  it("the resulting pattern is given in RLE format ", () => {
    const rle = play("./blinker.rle", 3);
    expect(rle).to.equal(`#C This is a blinker.\nx = 3, y = 3\n3b$3o!\n`);
  });
});

describe("When the glider rle file and iterations amount 1 are given", () => {
  it("the resulting pattern is given in RLE format ", () => {
    const rle = play("./glider.rle", 1);
    expect(rle).to.equal(`#C This is a glider.\nx = 3, y = 3\n3b$1o1b1o$1b2o!\n`);
  });
});

describe("When the glider rle file and iterations amount 2 are given", () => {
  it("the resulting pattern is given in RLE format ", () => {
    const rle = play("./glider.rle", 2);
    expect(rle).to.equal(`#C This is a glider.\nx = 3, y = 3\n3b$2b1o$1b2o!\n`);
  });
});
