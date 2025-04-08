import {
  mouseEnterEvent,
  mouseDownEvent,
} from 'core/events/cell'
import { style } from 'core/style'
import { isNonZero } from 'fns'
import { StateEvent, state, useEvent } from '../store'
import { Cell } from 'core/interface/types'

export const setupCells = (
  Cells: NodeListOf<HTMLDivElement>
) => {
  Cells.forEach((Cell) => {
    const { key } = Object.assign(Cell.dataset)
    const cell: Cell = state.board[key]
    const { editable, decoration, value } = cell
    if (isNonZero(value)) Cell.innerHTML = `<p>${value}</p>`
    const classNames =
      style.board.cell[editable][decoration].split(' ')
    Cell.classList.add(...classNames)

    const payload = {
      cell,
      toggles: state.toggles,
    }
    const onMouseDown = useEvent(mouseDownEvent)(payload)
    Cell.addEventListener('mousedown', onMouseDown)

    const onMouseEnter = useEvent(mouseEnterEvent)
    Cell.addEventListener(
      'mouseenter',
      onMouseEnter(payload)
    )

    document.addEventListener('state', (event) => {
      const { board, toggles } = (event as StateEvent)
        .detail
      payload.cell = state.board[key]
      payload.toggles = toggles
      const { editable, decoration, value } = board[key]
      Cell.classList.remove(...Cell.classList)
      const classNames =
        style.board.cell[editable][decoration].split(' ')
      Cell.classList.add(...classNames)
      isNonZero(value)
        ? (Cell.innerHTML = `<p>${value}</p>`)
        : (Cell.innerHTML = '')
    })
  })
}
