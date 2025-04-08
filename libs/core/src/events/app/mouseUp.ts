import { some } from 'fp-ts/Option'
import { setToggle } from '../../actions'
import { mouseDownLens } from '../../interface/optics'
import type { CoreEvent } from '../types'

export const mouseUpEvent: CoreEvent<MouseEvent, {}> = () =>
  some([setToggle({ lens: mouseDownLens, value: false })])
