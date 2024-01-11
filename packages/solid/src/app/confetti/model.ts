import P5 from 'p5'
import { System } from 'confetti'

const getDimensions = () => ({
  width: document.body.scrollWidth,
  height: document.body.scrollHeight - 5
})

export const sketch = (p5: P5) => {
  let system: System

  p5.setup = () => {
    const { width, height } = getDimensions()
    p5.createCanvas(width, height)
    system = new System(p5)
  }

  p5.draw = () => {
    const { width, height } = getDimensions()
    p5.resizeCanvas(width, height)
    system.addParticle()
    system.run()
  }
}
