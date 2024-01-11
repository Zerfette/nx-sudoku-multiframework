import P5 from 'p5'
import { createMemo, onCleanup } from 'solid-js'
import style from 'style'
import { sketch } from './model'
import { state } from '~/store'

const _ = () => {
  let p5: P5

  const root = (
    <div class={style.menu.confetti} />
  ) as HTMLElement

  createMemo(() => {
    if (state.isSolved) {
      p5 = new P5(sketch, root)
    } else {
      p5?.remove()
    }
  })

  onCleanup(() => {
    p5?.remove()
  })

  return root
}

export default _
