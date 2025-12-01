import { DirectionKey } from '../interface/direction';
import { Coordinate } from './coordinate';

export class Grid<T> {
  gridArray: GridCoordinate<T>[][];

  constructor(
    private input: T[][],
    private wallIdentifier?: string
  ) {
    this.gridArray = input.map((row, y) =>
      row.map((value, x) => new GridCoordinate(new Coordinate(x, y), value, this, wallIdentifier))
    );
  }

  getValueAt(coordinate: Coordinate): GridCoordinate<T> | undefined {
    try {
      return this.gridArray[coordinate.y]?.[coordinate.x];
    } catch {
      return undefined;
    }
  }

  findAllCoordinatesWithValue(value: T): GridCoordinate<T>[] {
    const results: GridCoordinate<T>[] = [];
    for (const row of this.gridArray) {
      for (const cell of row) {
        if (cell.value === value) {
          results.push(cell);
        }
      }
    }
    return results;
  }

  clone() : Grid<T> {
    const newInput: T[][] = this.input.map(row => [...row]);
    return new Grid<T>(newInput, this.wallIdentifier);
  }

  logGrid(): void {
    console.log(this.gridArray.map(row => row.map(cell => cell.value).join('')).join('\n'));
  }
}

export class GridCoordinate<T> {
  constructor(
    public coordinate: Coordinate,
    public value: T,
    private grid: Grid<T>,
    private wallIdentifier?: string
  ) {}

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

  findNeighborsWithValue(value: T) {
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

  findNeighborInDirection(direction: DirectionKey): GridCoordinate<T> | undefined {
    return this._getNeighbor(direction);
  }

  private _getNeighbor(direction: DirectionKey): GridCoordinate<T> | undefined {
    const dirCoord = this.coordinate.directions[direction];

    const neighbor = this.grid.getValueAt(dirCoord);

    return neighbor && !this._isWall(neighbor) ? neighbor : undefined;
  }

  private _isWall(gc: GridCoordinate<T>): boolean {
    return (!!this.wallIdentifier && !!gc.value && gc.value === this.wallIdentifier);
  }
}
