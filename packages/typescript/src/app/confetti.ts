import P5 from 'p5'
import { sketch } from 'confetti/sketch'
import { StateEvent } from '../store'
import { isSolved } from 'core/computed'

export const setupConfetti = (element: HTMLDivElement) => {
  let p5: P5
  document.addEventListener('state', (event) => {
    const { board } = (event as StateEvent).detail
    if (isSolved(board)) {
      p5 = new P5(sketch(document.body), element)
    } else {
      p5?.remove()
    }
  })
}
