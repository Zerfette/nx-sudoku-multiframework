import { Accessor } from 'solid-js'
import style from 'style'

type Props = {
  i: number
  hint: Accessor<number[]>
}

const _ = ({ i, hint }: Props) => (
  <div
    class={
      hint().includes(i)
        ? style.hint.number.on
        : style.hint.number.off
    }
  >
    {i}
  </div>
)

export default _