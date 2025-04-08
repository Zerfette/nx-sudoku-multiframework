import P5 from 'p5'
import { mapWithIndex } from 'fp-ts/Array'
import { Particle } from './particle'

export class System {
  p5: P5
  particles: Particle[]

  constructor(p5: P5) {
    this.p5 = p5
    this.particles = []
  }

  addParticle() {
    this.particles.push(new Particle(this.p5))
  }

  run(): void {
    mapWithIndex((i: number, p: Particle) => {
      p.run()
      p.isDead() && this.particles.splice(i, 1)
    })(this.particles)
  }
}
