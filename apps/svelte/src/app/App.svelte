<script lang="ts">
  import {
    autosolveEvent,
    keyDownEvent,
    mouseDownEvent,
    mouseUpEvent,
  } from 'core/events/app'
  import { style } from 'core/style'
  import { dispatchFold, state } from 'apps/svelte/store'
  import { useEvent } from 'apps/svelte/lib/hooks'
  import Board from './board/Board.svelte'
  import Confetti from './Confetti.svelte'
  import Menu from './menu/Menu.svelte'
  import Hint from './hint/Hint.svelte'
  import { pipe } from 'fp-ts/lib/function'

  const {
    canAutosolve,
    hints,
    selectedNumber,
    selection,
    toggles,
  } = state

  const onmousedown = (event: MouseEvent) => {
    const payload = {
      selection: $selection,
      toggles: $toggles,
    }
    const eventData = { event, payload }
    pipe(eventData, mouseDownEvent, dispatchFold)
  }

  const onmouseup = useEvent(mouseUpEvent)({})

  const onkeydown = (event: KeyboardEvent) => {
    const payload = { selection: $selection }
    const eventData = { event, payload }
    pipe(eventData, keyDownEvent, dispatchFold)
  }
  document.addEventListener('keydown', onkeydown)

  const classname = $derived(
    $toggles.darkMode ? style.root.dark : style.root.light
  )

  $effect(() => {
    if ($canAutosolve)
      useEvent(autosolveEvent)({
        hints: $hints,
        selectedNumber: $selectedNumber,
        selection: $selection,
      })({})
  })
</script>

<main>
  <div
    tabindex="0"
    class={classname}
    role="link"
    {onmousedown}
    {onmouseup}
  >
    <Menu />
    <Board />
    <Hint />
    <Confetti />
  </div>
</main>
