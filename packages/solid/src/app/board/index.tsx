import { For } from 'solid-js'
import style from 'style'
import Region from './region'
import { onMouseOut, onMouseOver, regionIndicies } from './model'
const _ = () => (
  <div
    class={style.board.root}
    onMouseOut={onMouseOut}
    onMouseOver={onMouseOver}
  >
    <For each={regionIndicies}>
      {(region) => <Region region={region} />}
    </For>
  </div>
)

export default _
