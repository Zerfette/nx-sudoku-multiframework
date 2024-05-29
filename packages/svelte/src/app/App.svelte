<script lang="ts">
  import {
    autosolveEvent,
    keyDownEvent,
    mouseDownEvent,
    mouseUpEvent,
  } from 'core/events/app'
  import { style } from 'core/style'
  import { pipe } from 'fp-ts/function'
  import { dispatchFold, state } from '~/store'
  import { useKeyDown } from '~/lib/hooks/keydown'
  import Board from './board/Board.svelte'
  import Confetti from './Confetti.svelte'
  import Menu from './menu/Menu.svelte'
  import Hint from './hint/Hint.svelte'

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

  const onmouseup = (event: MouseEvent) =>
    dispatchFold(mouseUpEvent({ event, payload: {} }))

  const onKeyDown = (event: KeyboardEvent) => {
    const payload = { selection: $selection }
    const eventData = { event, payload }
    pipe(eventData, keyDownEvent, dispatchFold)
  }
  useKeyDown(onKeyDown)

  const classname = $derived(
    $toggles.darkMode ? style.root.dark : style.root.light
  )

  $effect(() => {
    if ($canAutosolve) {
      const payload = {
        hints: $hints,
        selectedNumber: $selectedNumber,
        selection: $selection,
      }
      const eventData = { event: {}, payload }
      pipe(eventData, autosolveEvent, dispatchFold)
    }
  })
</script>

<main>
  <div
    class={classname}
    {onmousedown}
    {onmouseup}
    role="none"
  >
    <Menu />
    <Board />
    <Hint />
    <Confetti />
  </div>
</main>
