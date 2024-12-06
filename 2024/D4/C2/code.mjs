import { readFileSync } from 'fs';
import { logItem, debugItem, logResult } from '../../../utils/logger.mjs';

const SEARCH_WORD = 'MAS';

const DIRECTIONS = {
    right: {y: 0, x: 1},
    left: {y: 0, x: -1},
    up: {y: -1, x: 0},
    down: {y: 1, x: 0},
    ur: {y: -1, x: 1},
    ul: {y: -1, x: -1},
    dr: {y: 1, x: 1},
    dl: {y: 1, x: -1}
}

const DATA = readFileSync('./input.txt', 'utf8');
debugItem('DATA', DATA);
const GRID = splitIntoArray(DATA);
debugItem('Grid Content:', GRID)
const GRID_DIM = calculateGridDimensions(GRID);
logItem('Grid Dimensions:', GRID_DIM)
const result = searchForWord(SEARCH_WORD, GRID);

logResult(result)

/**
 * @param {string[][]} grid 
 * @returns {{y: number, x: number}}
 */
function calculateGridDimensions(grid) {
    return {
        y: grid.length,
        x: grid[0].length
    };
}

/**
 * @param {string} word
 * @param {string[][]} grid 
 * @returns {number}
 */
function searchForWord(word, grid) {
    let timesFound = 0;
    
    grid.forEach((elementY, indexY) => {
        elementY.forEach((elementX, indexX) => {
            const wordsInLocation = checkForWordInLocation({y: indexY, x: indexX}, word, elementX);

            timesFound += wordsInLocation;
        });
    });

    return timesFound;

    /**
     * 
     * @param {{y: number, x: number}} location 
     * @param {string} word 
     * @param {string} slotValue 
     * @returns {number}
     */
    function checkForWordInLocation(location, word, slotValue) {
        if (slotValue !== 'A') return 0;
        
        const availableDirections = calculateAvailableDirections(GRID_DIM, location, word);

        if (!availableDirections.left || !availableDirections.right || !availableDirections.up || !availableDirections.down) return 0;

        let timesFound = 0;

        const validLetters = ['M', 'S'];

        if (
            validLetters.includes(grid[location.y + availableDirections.ul.y][location.x + availableDirections.ul.x]) && 
            validLetters.includes(grid[location.y + availableDirections.dr.y][location.x + availableDirections.dr.x]) && 
            grid[location.y + availableDirections.dr.y][location.x + availableDirections.dr.x] !== grid[location.y + availableDirections.ul.y][location.x + availableDirections.ul.x] &&
            validLetters.includes(grid[location.y + availableDirections.ur.y][location.x + availableDirections.ur.x]) && 
            validLetters.includes(grid[location.y + availableDirections.dl.y][location.x + availableDirections.dl.x]) && 
            grid[location.y + availableDirections.ur.y][location.x + availableDirections.ur.x] !== grid[location.y + availableDirections.dl.y][location.x + availableDirections.dl.x]
        ) {
            timesFound++;
        }

        return timesFound;
    }
}

/**
 * @param {{y: number, x: number}} gridDim 
 * @param {{y: number, x: number}} location 
 * @param {string} searchWord 
 */
function calculateAvailableDirections(gridDim, location, searchWord) {
    const toCloseTo = {
        right: location.x > (gridDim.x - 2),  // XMAS     length: 3     max x position: 8
        left: location.x < 1,                 // XMAS     length: 3     min x position: 1
        bottom: location.y > (gridDim.y - 2), // XMAS     length: 3     max y position: 8
        top: location.y < 1,                  // XMAS     length: 3     min y position: 1
    }

    const result = {};

    if (!toCloseTo.right) result.right = DIRECTIONS.right;
    if (!toCloseTo.left) result.left = DIRECTIONS.left;
    if (!toCloseTo.top) result.up = DIRECTIONS.up;
    if (!toCloseTo.bottom) result.down = DIRECTIONS.down;
    if (!toCloseTo.top && !toCloseTo.right) result.ur = DIRECTIONS.ur;
    if (!toCloseTo.top && !toCloseTo.left) result.ul = DIRECTIONS.ul;
    if (!toCloseTo.bottom && !toCloseTo.right) result.dr = DIRECTIONS.dr;
    if (!toCloseTo.bottom && !toCloseTo.left) result.dl = DIRECTIONS.dl;

    return result;
}

/**
 * @param {string} data 
 * @returns {string[][]}
 */
function splitIntoArray(data) {
    return data.split('\r\n').map((v) => v.split(''));
}
