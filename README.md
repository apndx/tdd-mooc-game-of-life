# TDD Mooc - Conway's Game of life

The assignment is to write Conway's Game of Life using TDD. Write it as a command line application which takes as input a pattern file in RLE format and the number of iterations to simulate, and then outputs the resulting pattern in RLE format after the specified number of iterations.

For test data, you can download RLE files from LifeWiki; see the Pattern files section in each pattern's infobox, on the right side of the page. Glider, Blinker and Block are some of the simplest patterns. Gosper glider gun is an example of an infinitely growing pattern.

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
