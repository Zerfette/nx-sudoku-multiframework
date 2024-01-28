import { System } from './system'
import { Sketch } from './types'

const getDimensions = (body: HTMLElement) => ({
  width: body.scrollWidth,
  height: body.scrollHeight - 5
})

export const sketch: Sketch = (body) => (p5) => {
  let system: System
  const { width, height } = getDimensions(body)

  p5.setup = () => {
    p5.createCanvas(width, height)
    system = new System(p5)
  }

  p5.draw = () => {
    p5.resizeCanvas(width, height)
    system.addParticle()
    system.run()
  }
}
