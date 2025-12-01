"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinate = void 0;
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get directions() {
        return {
            Up: new Coordinate(this.x, this.y - 1),
            Down: new Coordinate(this.x, this.y + 1),
            Left: new Coordinate(this.x - 1, this.y),
            Right: new Coordinate(this.x + 1, this.y),
            UpLeft: new Coordinate(this.x - 1, this.y - 1),
            UpRight: new Coordinate(this.x + 1, this.y - 1),
            DownLeft: new Coordinate(this.x - 1, this.y + 1),
            DownRight: new Coordinate(this.x + 1, this.y + 1)
        };
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
exports.Coordinate = Coordinate;
//# sourceMappingURL=coordinate.js.map