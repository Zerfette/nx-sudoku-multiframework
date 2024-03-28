<script lang="ts">
  import { mouseOutsideEvent } from 'core/events/board'
  import { regionIndicies } from 'core/interface/toolkit'
  import { style } from 'core/style'
  import { pipe } from 'fp-ts/function'
  import { dispatchFold } from '~/store'
  import Region from './Region.svelte'

  const setMouseOutside = (value: boolean) => (event: MouseEvent) => {
    const payload = { value }
    const eventData = { event, payload }
    pipe(eventData, mouseOutsideEvent, dispatchFold)
  }
  const onMouseOut = setMouseOutside(true)
  const onMouseOver = setMouseOutside(false)
</script>

<div
  class={style.board.root}
  on:mouseout={onMouseOut}
  on:mouseover={onMouseOver}
>
  {#each regionIndicies as region}
    <Region {region} />
  {/each}
</div>
