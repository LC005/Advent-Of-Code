export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
  UpLeft = "ul",
  UpRight = "ur",
  DownLeft = "dl",
  DownRight = "dr"
}

export type DirectionKey = keyof typeof Direction;