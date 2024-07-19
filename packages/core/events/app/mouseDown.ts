import { some } from 'fp-ts/Option'
import { getMonoid } from 'fp-ts/Array'
import { isNone } from 'fp-ts/Option'
import { clearSelection, setToggle } from '../../actions'
import { Action } from '../../actions/types'
import { mouseDownLens } from '../../interface/optics'
import { Selection, Toggles } from '../../interface/types'
import type { CoreEvent } from '../types'

const { concat } = getMonoid<Action>()

type Payload = { selection: Selection; toggles: Toggles }

export const mouseDownEvent: CoreEvent<MouseEvent, Payload> = ({
  payload: { selection, toggles },
}) => {
  const actions = [setToggle({ lens: mouseDownLens, value: true })]
  if (isNone(selection) || !toggles.mouseOutside)
    return some(actions)
  return some(concat(actions, [clearSelection]))
}
