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
    gameOfLife.extractDimensions();
    const width = gameOfLife.width;
    const height = gameOfLife.height;
    expect(width).to.equal(3);
    expect(height).to.equal(3);
  });

  it("dimensions can be used to initialize empty game board", () => {
    gameOfLife.makeBoardArray();
    const board = gameOfLife.getBoardString();
    console.log(board)
    expect(board).to.equalShape(
      `...
       ...
       ...`
    );
  });



  xit("can be used to convert a pattern to a game board array", () => {
    gameOfLife.convertToArray();
    const cells = gameOfLife.getArray();
    expect(cells).to.equal([['.','.','0'],['.','.','0'],['0','0','0']]);
  });

});
