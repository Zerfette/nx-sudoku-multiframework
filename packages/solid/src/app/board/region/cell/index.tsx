import { Component, Show } from 'solid-js'
import style from 'style'
import {
  getBgColorKey,
  getCell,
  getTxtColorKey,
  onMouseDown,
  onMouseEnter,
  valueIsNonZero,
} from './model'

const _: Component<{ i: number }> = ({ i }) => {
  const cell = getCell(i)
  const when = valueIsNonZero(cell)
  const txtColorKey = getTxtColorKey(cell)
  const bgColorKey = getBgColorKey(cell)
  return (
    <div
      class={`${style.board.cell[txtColorKey()][bgColorKey()]}`}
      onMouseDown={onMouseDown(cell)}
      onMouseEnter={onMouseEnter(cell)}
    >
      <Show when={when()}>
        <p>{cell().value}</p>
      </Show>
    </div>
  )
}

export default _
