<script lang="ts">
  import { mouseEnterEvent, mouseDownEvent } from 'core/events/cell'
  import { style } from 'core/style'
  import { isNonZero } from 'fns'
  import { pipe } from 'fp-ts/function'
  import { derived } from 'svelte/store'
  import { state, dispatchFold } from '~/store'

  export let i: number
  const { board, toggles } = state
  const cell = derived(board, (board) => board[i])

  const onMouseDown = (event: MouseEvent) => {
    const payload = { cell: $cell }
    const eventData = { event, payload }
    pipe(eventData, mouseDownEvent, dispatchFold)
  }
  const onMouseEnter = (event: MouseEvent) => {
    const payload = { cell: $cell, toggles: $toggles }
    const eventData = { event, payload }
    pipe(eventData, mouseEnterEvent, dispatchFold)
  }
</script>

<div
  class={style.board.cell[$cell.editable][$cell.decoration]}
  on:mouseenter={onMouseEnter}
  on:mousedown={onMouseDown}
  role="none"
>
  {#if isNonZero($cell.value)}
    <p>{$cell.value}</p>
  {/if}
</div>
