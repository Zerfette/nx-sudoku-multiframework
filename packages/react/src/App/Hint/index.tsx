import { getHints, getSelectedOption } from 'core/computed'
import { Digit as DigitType } from 'core/interface/types'
import {
  getFallback,
  getHint,
} from 'core/lib/components/hint'
import { style } from 'core/style'
import { isEmpty, map } from 'fp-ts/Array'
import { useStore } from '~/store'
import Digit from './Digit'
import { digits } from 'core/interface/toolkit'

const _ = () => {
  const { state } = useStore()
  const selection = getSelectedOption(state.board)
  const hints = getHints(state.board)
  const hint = getHint(hints)
  const Hints = map((digit: DigitType) => (
    <Digit digit={digit} hint={hint} key={digit} />
  ))(digits)
  const Fallback = <p>{getFallback(selection)}</p>
  return (
    <>
      <div className={style.hint.root}>
        <div className={style.hint.numbers}>{Hints}</div>
        <div className={style.hint.fallback}>
          {isEmpty(hint) && Fallback}
        </div>
      </div>
    </>
  )
}

export default _
