import { createMemo, Component, Show } from 'solid-js'
import { style } from 'core/style'
import { isNonZero } from 'fns'
import {
  mouseEnterEvent,
  mouseDownEvent,
} from 'core/events/cell'
import { state } from 'apps/solid/store'
import { useEvent } from 'apps/solid/lib/hooks'

const _: Component<{ i: number }> = ({ i }) => {
  const cell = createMemo(() => state.board[i])
  const onMouseDown = useEvent(mouseDownEvent)({
    cell: cell(),
  })

  const onMouseEnter = useEvent(mouseEnterEvent)({
    cell: cell(),
    toggles: state.toggles,
  })

  return (
    <div
      class={
        style.board.cell[cell().editable][cell().decoration]
      }
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      <Show when={isNonZero(cell().value)}>
        <p>{cell().value}</p>
      </Show>
    </div>
  )
}

export default _
