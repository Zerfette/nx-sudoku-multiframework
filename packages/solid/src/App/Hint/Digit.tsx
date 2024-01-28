import { elem } from 'fp-ts/Array'
import { Eq as nEq } from 'fp-ts/number'
import { Digit } from 'core/interface/types'
import { style } from 'core/style'

type Props = {
  digit: Digit
  hint: Digit[]
}

const _ = ({ digit, hint }: Props) => (
  <div
    class={
      elem(nEq)(digit)(hint)
        ? style.hint.number.on
        : style.hint.number.off
    }
  >
    {digit}
  </div>
)

export default _
