import P5 from 'p5'
import { chain, map } from 'fp-ts/Array'
import { Ord } from 'fp-ts/number'
import { geq, leq } from 'fp-ts/Ord'
import { colors } from 'theme'
import { directions, RotationDirection } from './rotationDirection'
import { Shape } from './types'

const shapes = [Shape.CIRCLE, Shape.SQUARE]

const confettiColors = chain((c: keyof typeof colors) =>
  map((x: keyof typeof colors.teal) => colors[c][x])([200, 400, 600])
)(['teal', 'purple', 'cyan', 'orange', 'pink', 'red', 'yellow'])

// [
//   colors.teal[600],
//   colors.teal[400],
//   colors.teal[200],
//   colors.purple[600],
//   colors.purple[400],
//   colors.purple[200],
//   colors.cyan[600],
//   colors.cyan[400],
//   colors.cyan[200],
//   colors.orange[600],
//   colors.orange[400],
//   colors.orange[200],
//   colors.pink[600],
//   colors.pink[400],
//   colors.pink[200],
//   colors.red[600],
//   colors.red[400],
//   colors.red[200],
//   colors.yellow[600],
//   colors.yellow[400],
//   colors.yellow[200]
// ]

export class Particle {
  p5: P5
  shape: Shape
  size: number
  color: string
  acceleration: P5.Vector
  velocity: P5.Vector
  position: P5.Vector
  rotateY: number
  angularSpin: number
  angle: number
  rotationDirection: RotationDirection

  constructor(p5: P5) {
    this.shape = p5.random(shapes)
    this.size = p5.random(8, 16)
    this.color = p5.random(confettiColors)
    this.acceleration = p5.createVector(0, 0.005 * this.size)
    this.velocity = p5.createVector(p5.random(-1, 1), 0)
    this.position = p5.createVector(p5.random(0, p5.width), -15)
    this.rotateY = p5.random(0, 1)
    this.angularSpin = p5.random(-0.1, 0.1)
    this.angle = p5.random(0, 360)
    this.rotationDirection = new RotationDirection(p5.random(directions))
    this.p5 = p5
  }

  run(): void {
    this.update()
    this.display()
  }

  update(): void {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.rotateY += this.getRotateY()
    this.angle += this.angularSpin
  }

  display(): void {
    this.p5.push()
    this.p5.noStroke()
    this.p5.fill(this.color)
    this.p5.translate(this.position.x, this.position.y)
    this.p5.rotate(this.angle)
    this.p5.scale(1, this.rotateY)
    this.shape === Shape.CIRCLE
      ? this.p5.circle(0, 0, this.size)
      : this.p5.square(0, 0, this.size)
    this.p5.pop()
  }

  getRotateY(): number {
    const pastPositiveLimit =
      geq(Ord)(this.rotateY, 1) && this.rotationDirection.isPositive()
    const pastNegativeLimit =
      leq(Ord)(this.rotateY, -1) && this.rotationDirection.isNegative()
    if (pastPositiveLimit || pastNegativeLimit) {
      this.rotationDirection.toggle()
    }
    return this.rotationDirection.isPositive() ? 0.1 : -0.1
  }

  isDead(): boolean {
    return this.position.y - this.size > this.p5.height
  }
}
