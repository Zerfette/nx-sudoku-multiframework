import { Accessor, createMemo } from 'solid-js'
import { selectNumber, selectCell } from 'core/actions'
import { Cell } from 'core/interface/types'
import { noConflicts } from 'core/model/isValidPlacement'
import { isNonZero } from 'fns'
import { state, dispatch } from '~/store'
import { TxtColor, BgColor } from 'style/types'

type onMouseEvent = (
  cell: Accessor<Cell>
) => (event: globalThis.MouseEvent) => void
export const onMouseEnter: onMouseEvent = (cell) => () => {
  const { ind, locked } = cell()
  if (locked) return
  if (!state.toggles.mouseDown) return
  const payload = { ind, clear: false }
  dispatch(selectCell(payload))
}

export const onMouseDown: onMouseEvent =
  (cell: Accessor<Cell>) =>
  ({ ctrlKey }: globalThis.MouseEvent): void => {
    const { ind, locked, value } = cell()
    locked
      ? dispatch(selectNumber({ value }))
      : dispatch(selectCell({ ind, clear: !ctrlKey }))
  }

export const valueIsNonZero = (cell: Accessor<Cell>) =>
  createMemo(() => isNonZero(cell().value))

type getCell = (i: number) => Accessor<Cell>
export const getCell: getCell = (i) =>
  createMemo(() => state.board[i])

type getTxtColorKey = (cell: Accessor<Cell>) => Accessor<TxtColor>
export const getTxtColorKey: getTxtColorKey = (cell) =>
  createMemo(() => (cell().locked ? 'locked' : 'unlocked'))

type getBgColorKey = (cell: Accessor<Cell>) => Accessor<BgColor>
export const getBgColorKey: getBgColorKey = (cell: Accessor<Cell>) =>
  createMemo(() => {
    const { highlighted, selected, value }: Cell = cell()
    const valid: boolean = noConflicts(state.board, cell(), value)
    return !valid
      ? 'invalid'
      : highlighted
      ? 'highlighted'
      : selected
      ? 'selected'
      : 'dflt'
  })
