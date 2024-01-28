import { none, some } from 'fp-ts/Option'
import { selectCell } from '../../actions'
import { isLocked } from '../../interface/toolkit'
import type { Cell, Toggles } from '../../interface/types'
import type { CoreEvent } from '../types'

type Payload = { cell: Cell; toggles: Toggles }

export const mouseEnterEvent: CoreEvent<MouseEvent, Payload> = ({
  payload: { cell, toggles },
}) => {
  if (isLocked(cell)) return none
  if (!toggles.mouseDown) return none
  return some([selectCell({ ind: cell.location.ind, clear: false })])
}
