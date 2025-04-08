import P5 from 'p5'

export type Sketch = (body: HTMLElement) => (p5: P5) => void

export enum Direction {
  POSITIVE = 1,
  NEGATIVE = -1
}

export enum Shape {
  SQUARE,
  CIRCLE
}