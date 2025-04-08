import { Direction } from './types'

export const directions = [Direction.NEGATIVE, Direction.POSITIVE]

export class RotationDirection {
  direction: Direction
  constructor(direction: Direction) {
    this.direction = direction
  }
  toggle() {
    this.direction = this.isPositive() ? Direction.NEGATIVE : Direction.POSITIVE
  }
  isPositive(): boolean {
    return this.direction === Direction.POSITIVE
  }
  isNegative(): boolean {
    return this.direction === Direction.NEGATIVE
  }
}
