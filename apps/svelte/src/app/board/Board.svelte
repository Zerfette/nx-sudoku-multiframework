<script lang="ts">
  import { mouseOutsideEvent } from 'core/events/board'
  import { regionIndicies } from 'core/interface/toolkit'
  import { style } from 'core/style'
  import { pipe } from 'fp-ts/function'
  import { dispatchFold } from 'apps/svelte/store'
  import Region from './Region.svelte'

  const setMouseOutside =
    (value: boolean) =>
    (event: MouseEvent | FocusEvent) => {
      const payload = { value }
      const eventData = { event, payload }
      pipe(eventData, mouseOutsideEvent, dispatchFold)
    }
  const onmouseout = setMouseOutside(true)
  const onmouseover = setMouseOutside(false)
</script>

<div
  class={style.board.root}
  {onmouseout}
  onblur={onmouseout}
  {onmouseover}
  onfocus={onmouseover}
  role="none"
>
  {#each regionIndicies as region}
    <Region {region} />
  {/each}
</div>
