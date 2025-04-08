import { mouseOutsideEvent } from 'core/events/board'
import { regionIndicies } from 'core/interface/toolkit'
import { For } from 'solid-js'
import { style } from 'core/style'
import { useEvent } from 'apps/solid/lib/hooks'
import Region from './Region'

const _ = () => {
  const onMouseOut = useEvent(mouseOutsideEvent)({value: true})
  const onMouseOver = useEvent(mouseOutsideEvent)({value: false})

  return (
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
}

export default _
