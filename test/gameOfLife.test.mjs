import { expect } from "chai";
import { GameOfLife } from "../src/gameOfLife.mjs";

describe("An RLE file", () => {
  const gameOfLife = new GameOfLife("./glider.rle");

  it("can be used to read a pattern", () => {
    gameOfLife.initialize();
    const pattern = gameOfLife.toString();
    expect(pattern).to.equal(`#C This is a glider.\nx = 3, y = 3\nbo$2bo$3o!\n`);
  });

  xit("can be used to convert a pattern to a game board", () => {
    gameOfLife.initialize();
    const pattern = gameOfLife.toString();
    expect(pattern).to.equalShape(
      `.O.
       ..O
       OOO`
    );
  });
});
