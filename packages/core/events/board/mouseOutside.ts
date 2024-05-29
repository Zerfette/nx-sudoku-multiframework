import { some } from 'fp-ts/Option'
import { setToggle } from '../../actions'
import { mouseOutsideLens } from '../../interface/optics'
import type { CoreEvent } from '../types'

type Payload = { value: boolean }

export const mouseOutsideEvent: CoreEvent<MouseEvent | FocusEvent, Payload> = ({
  payload: { value },
}) => some([setToggle({ lens: mouseOutsideLens, value })])
