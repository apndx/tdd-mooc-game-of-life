import { expect } from "chai";
import { GameOfLife } from "../src/gameOfLife.mjs";

describe("An RLE file", () => {
  const gameOfLife = new GameOfLife("./glider.rle");

  it("can be used to read a pattern", () => {
    gameOfLife.initialize();
    const rle = gameOfLife.getRle();
    expect(rle).to.equal(`#C This is a glider.\nx = 3, y = 3\nbo$2bo$3o!\n`);
  });

  it("can be used to convert a pattern to a game board", () => {
    gameOfLife.parseRle();
    const cells = gameOfLife.getCells();
    expect(cells).to.equal(` 0\n  0\n000\n`);
  });
});
