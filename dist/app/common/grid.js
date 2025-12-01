"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCoordinate = exports.Grid = void 0;
const coordinate_1 = require("./coordinate");
class Grid {
    constructor(input, wallIdentifier) {
        this.input = input;
        this.wallIdentifier = wallIdentifier;
        this.gridArray = input.map((row, y) => row.map((value, x) => new GridCoordinate(new coordinate_1.Coordinate(x, y), value, this, wallIdentifier)));
    }
    getValueAt(coordinate) {
        try {
            return this.gridArray[coordinate.y]?.[coordinate.x];
        }
        catch {
            return undefined;
        }
    }
    findAllCoordinatesWithValue(value) {
        const results = [];
        for (const row of this.gridArray) {
            for (const cell of row) {
                if (cell.value === value) {
                    results.push(cell);
                }
            }
        }
        return results;
    }
    clone() {
        const newInput = this.input.map(row => [...row]);
        return new Grid(newInput, this.wallIdentifier);
    }
    logGrid() {
        console.log(this.gridArray.map(row => row.map(cell => cell.value).join('')).join('\n'));
    }
}
exports.Grid = Grid;
class GridCoordinate {
    constructor(coordinate, value, grid, wallIdentifier) {
        this.coordinate = coordinate;
        this.value = value;
        this.grid = grid;
        this.wallIdentifier = wallIdentifier;
    }
    get neighbors() {
        return {
            Up: this._getNeighbor('Up'),
            Down: this._getNeighbor('Down'),
            Left: this._getNeighbor('Left'),
            Right: this._getNeighbor('Right'),
            UpLeft: this._getNeighbor('UpLeft'),
            UpRight: this._getNeighbor('UpRight'),
            DownLeft: this._getNeighbor('DownLeft'),
            DownRight: this._getNeighbor('DownRight')
        };
    }
    findNeighborsWithValue(value) {
        const { Up, Down, Left, Right, UpLeft, UpRight, DownLeft, DownRight } = this.neighbors;
        return {
            Up: Up?.value === value ? Up : undefined,
            Down: Down?.value === value ? Down : undefined,
            Left: Left?.value === value ? Left : undefined,
            Right: Right?.value === value ? Right : undefined,
            UpLeft: UpLeft?.value === value ? UpLeft : undefined,
            UpRight: UpRight?.value === value ? UpRight : undefined,
            DownLeft: DownLeft?.value === value ? DownLeft : undefined,
            DownRight: DownRight?.value === value ? DownRight : undefined
        };
    }
    findNeighborInDirection(direction) {
        return this._getNeighbor(direction);
    }
    _getNeighbor(direction) {
        const dirCoord = this.coordinate.directions[direction];
        const neighbor = this.grid.getValueAt(dirCoord);
        return neighbor && !this._isWall(neighbor) ? neighbor : undefined;
    }
    _isWall(gc) {
        return (!!this.wallIdentifier && !!gc.value && gc.value === this.wallIdentifier);
    }
}
exports.GridCoordinate = GridCoordinate;
//# sourceMappingURL=grid.js.map