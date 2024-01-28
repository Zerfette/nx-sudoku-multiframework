import { For } from 'solid-js'
import { pipe } from 'fp-ts/function'
import { mouseOutsideEvent } from 'core/events/board'
import { regionIndicies } from 'core/interface/toolkit'
import { style } from 'core/style'
import { dispatchFold } from '~/store'
import Region from './Region'

const _ = () => {
  const setMouseOutside = (value: boolean) => (event: MouseEvent) => {
    const payload = { value }
    const eventData = { event, payload }
    pipe(eventData, mouseOutsideEvent, dispatchFold)
  }

  return (
    <div
      class={style.board.root}
      onMouseOut={setMouseOutside(true)}
      onMouseOver={setMouseOutside(false)}
    >
      <For each={regionIndicies}>
        {(region) => <Region region={region} />}
      </For>
    </div>
  )
}

export default _
