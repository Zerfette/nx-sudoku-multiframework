import { pipe } from 'fp-ts/function'
import { createMemo, Component, Show } from 'solid-js'
import { style } from 'core/style'
import { isNonZero } from 'fns'
import { mouseEnterEvent, mouseDownEvent } from 'core/events/cell'
import { state, dispatchFold } from '~/store'

const _: Component<{ i: number }> = ({ i }) => {
  const cell = createMemo(() => state.board[i])
  const onMouseDown = (event: MouseEvent) => {
    const payload = { cell: cell() }
    const eventData = { event, payload }
    pipe(eventData, mouseDownEvent, dispatchFold)
  }
  const onMouseEnter = (event: MouseEvent) => {
    const payload = { cell: cell(), toggles: state.toggles }
    const eventData = { event, payload }
    pipe(eventData, mouseEnterEvent, dispatchFold)
  }

  return (
    <div
      class={style.board.cell[cell().editable][cell().decoration]}
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
