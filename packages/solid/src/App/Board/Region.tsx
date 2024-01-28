import { Component, For } from 'solid-js'
import { style } from 'core/style'
import Cell from './Cell'

const _: Component<{ region: number[] }> = ({ region }) => (
  <div class={style.board.region}>
    <For each={region}>{(i) => <Cell i={i} />}</For>
  </div>
)

export default _
