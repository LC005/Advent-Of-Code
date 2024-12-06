import { readFileSync } from 'fs';
import { logItem, debugItem, logResult } from '../../../utils/logger.mjs';

const SEARCH_WORD = 'XMAS';

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
        if (slotValue !== 'X') return false;
        
        const availableDirections = calculateAvailableDirections(GRID_DIM, location, word);

        let timesFound = 0;
        
        for (const key in availableDirections) {
            const checkLocation = {...location};
            const walkDir = availableDirections[key];
            let foundWord = '';

            for (const element of word) {
                foundWord += grid[checkLocation.y][checkLocation.x];

                // Move to next checklocation
                checkLocation.x += walkDir.x;
                checkLocation.y += walkDir.y;
            }

            if (foundWord === word) timesFound++;
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
        right: location.x > (gridDim.x - (searchWord.length)),  // XMAS     length: 4     max x position: 6        
        left: location.x < (searchWord.length - 1),             // XMAS     length: 4     min x position: 3
        bottom: location.y > (gridDim.y - (searchWord.length)), // XMAS     length: 4     max y position: 6    
        top: location.y < (searchWord.length - 1),              // XMAS     length: 4     min y position: 3    
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
