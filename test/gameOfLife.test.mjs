import { expect } from "chai";
import { GameOfLife } from "../src/gameOfLife.mjs";

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
