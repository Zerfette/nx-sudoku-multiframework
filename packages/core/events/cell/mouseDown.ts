import { some } from 'fp-ts/Option'
import { selectNumber, selectCell } from '../../actions'
import { isLocked } from '../../interface/toolkit'
import type { Cell } from '../../interface/types'
import type { CoreEvent } from '../types'

type Payload = { cell: Cell }

export const mouseDownEvent: CoreEvent<MouseEvent, Payload> = ({
  event: { ctrlKey },
  payload: { cell },
}) =>
  isLocked(cell)
    ? some([selectNumber({ value: cell.value })])
    : some([selectCell({ ind: cell.location.ind, clear: !ctrlKey })])
