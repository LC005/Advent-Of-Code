import { DirectionKey } from './../interface/direction';

export class Coordinate {
  constructor(public x: number, public y: number) {}

  get directions(): { [key in DirectionKey]: Coordinate } {
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

  equals(other: Coordinate): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}