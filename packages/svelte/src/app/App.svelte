<script lang="ts">
  import {
    autosolveEvent,
    keyDownEvent,
    mouseDownEvent,
    mouseUpEvent,
  } from 'core/events/app'
  import { style } from 'core/style'
  import { state } from '~/store'
  import { useEvent } from '~/lib/hooks'
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

  const onmousedown = useEvent(mouseDownEvent)({
    selection: $selection,
    toggles: $toggles,
  })
  const onmouseup = useEvent(mouseUpEvent)({})

  const onkeydown = useEvent(keyDownEvent)({
    selection: $selection,
  })
  document.addEventListener('mousedown', onmousedown)
  document.addEventListener('mouseup', onmouseup)
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
  >
    <Menu />
    <Board />
    <Hint />
    <Confetti />
  </div>
</main>
