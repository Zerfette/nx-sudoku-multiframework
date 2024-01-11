import { Component, For } from 'solid-js'
import style from 'style'
import Cell from './cell'

const _: Component<{ region: number[] }> = ({ region }) => (
  <div class={style.board.region}>
    <For each={region}>{(i) => <Cell i={i} />}</For>
  </div>
)

export default _
