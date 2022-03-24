# TDD Mooc - Conway's Game of life

The assignment is to write Conway's Game of Life using TDD. Write it as a command line application which takes as input a pattern file in RLE format and the number of iterations to simulate, and then outputs the resulting pattern in RLE format after the specified number of iterations.

For test data, you can download RLE files from LifeWiki; see the Pattern files section in each pattern's infobox, on the right side of the page. Glider, Blinker and Block are some of the simplest patterns. Gosper glider gun is an example of an infinitely growing pattern.

## [Game of life rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

The rules that compare the behavior of the automaton to real life, can be condensed into the following:

Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Prerequisites

You'll need a recent [Node.js](https://nodejs.org/) version. Then download this project's dependencies with:

    npm install

## Developing

Run tests once

    npm run test

Run tests continuously

    npm run autotest

Code reformat

    npm run format
    
## Playing the game on the command line

First you need to save an rle file to the project root. There are already two test files, 'glider.rle' and 'blinker.rle'. After that you can start the simulation in the root folder:

    npm run play <your rle file> <nro of iterations>

For example: 

    npm run play glider.rle 3
