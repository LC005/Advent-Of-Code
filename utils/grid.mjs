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

export class Grid {
    gridArray;
    
    location = {
        y: 0,
        x: 0
    };
    availableDirections = {};

    /**
     * 
     * @param {string} stringInput 
     */
    constructor(stringInput) {
        this.gridArray = this.stringToGrid(stringInput);

        this.init();
    }

    init() {
        this.location = {
            y: 0,
            x: 0
        };
        this.availableDirections = calculateAvailableDirections()
    }

    /**
     * 
     * @param {string} stringInput 
     * @returns {string[][]}
     */
    stringToGrid(stringInput) {
        return stringInput.split('\r\n').map((v) => v.split(''));
    }

    /**
     * @param {keyof DIRECTIONS} direction 
     * @returns {{y: number, x: number}}
     */
    move(direction) {

    }

    /**
     * @param {{y: number, x: number}} gridDim 
     * @param {{y: number, x: number}} location 
     * @param {string} searchWord 
     */
    calculateAvailableDirections(gridDim, location) {
        const toCloseTo = {
            right: location.x > (gridDim.x - 1),
            left: location.x < 1,
            bottom: location.y > (gridDim.y - 1),
            top: location.y < 1,
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
}