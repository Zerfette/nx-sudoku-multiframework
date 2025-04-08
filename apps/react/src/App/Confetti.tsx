import P5 from 'p5'
import { isSolved } from 'core/computed'
import { useEffect, useRef } from 'react'
import { sketch } from 'confetti/sketch'
import { style } from 'core/style'
import { useStore } from 'apps/react/store'

export const Confetti = () => {
  let p5: P5
  let canvas = useRef<HTMLDivElement>(
    (<></>) as unknown as HTMLDivElement
  )
  const { state } = useStore()

  useEffect(() => {
    if (isSolved(state.board)) {
      p5 = new P5(sketch(document.body), canvas.current)
    } else {
      p5?.remove()
    }
    return () => {
      p5?.remove()
    }
  })

  return (
    <div ref={canvas} className={style.menu.confetti}></div>
  )
}
