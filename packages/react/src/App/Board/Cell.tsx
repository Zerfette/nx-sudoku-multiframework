import {
  mouseEnterEvent,
  mouseDownEvent,
} from 'core/events/cell'
import { style } from 'core/style'
import { isNonZero } from 'fns'
import { useEvent } from '~/lib/hooks'
import { useStore } from '~/store'

const Cell = ({ i }: { i: number }) => {
  const { state } = useStore()
  const { board, toggles } = state
  const cell = board[i]
  const className =
    style.board.cell[cell.editable][cell.decoration]
  const onMouseDown = useEvent(mouseDownEvent)({ cell })
  const onMouseEnter = useEvent(mouseEnterEvent)({
    cell,
    toggles,
  })

  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      <p>{isNonZero(cell.value) && cell.value}</p>
    </div>
  )
}

export default Cell
