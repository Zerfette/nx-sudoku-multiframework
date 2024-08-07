import { Digit } from 'core/interface/types'
import { style } from 'core/style'
import { elem } from 'fp-ts/Array'
import { Eq as nEq } from 'fp-ts/number'
import { Accessor } from 'solid-js'

type Props = {
  digit: Digit
  hint: Accessor<Digit[]>
}

const _ = ({ digit, hint }: Props) => (
  <div
    class={
      elem(nEq)(digit)(hint())
        ? style.hint.number.on
        : style.hint.number.off
    }
  >
    {digit}
  </div>
)

export default _
