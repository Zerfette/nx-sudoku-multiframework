<script lang="ts">
  import Fa from 'svelte-fa'
  import { faQuestion } from '@fortawesome/free-solid-svg-icons'
  import { style } from 'core/style'
  import { getContext } from 'svelte'
  import {
    useDisclosure,
    type Stopwatch,
  } from '~/lib/hooks'
  import { Modal } from '~/lib/components'
  import { get, writable } from 'svelte/store'

  const { isRunning, toggleTimer } =
    getContext<Stopwatch>('stopwatch')
  const { isOpen, onClose, onOpen } = useDisclosure()

  const resume = writable(false)
  $effect(() => {
    if ($isOpen && $isRunning) {
      toggleTimer()
      resume.set(true)
    }

    if (!$isOpen && get(resume)) {
      toggleTimer()
      resume.set(false)
    }
  })
  const onclick = onOpen
</script>

<button class={style.menu.btns.off} {onclick}>
  <Fa icon={faQuestion} size="lg" />
</button>
<Modal {isOpen} {onClose} className={style.component.modal}>
  <h1 class={style.typography.h1}>Getting Started</h1>
  <p class={style.typography.p}>
    Click cells to select them.
  </p>
  <p class={style.typography.p}>
    Hold
    <kbd class={style.typography.kbd}>CTRL</kbd>
    to select multiple cells.
  </p>
  <p class={style.typography.p}>
    Press
    <kbd class={style.typography.kbd}>CTRL</kbd>+
    <kbd class={style.typography.kbd}>A</kbd>
    to select all cells.
  </p>
  <p class={style.typography.p}>
    Press
    <kbd class={style.typography.kbd}>ENTER</kbd>
    or click off the board to clear the selection.
  </p>
  <p class={style.typography.p}>
    Press any number
    <kbd class={style.typography.kbd}>1</kbd>
    ...
    <kbd class={style.typography.kbd}>9</kbd>
    on the keyboard to place that number in the selected cells.
  </p>
  <p class={style.typography.p}>
    Press
    <kbd class={style.typography.kbd}>DEL</kbd>
    to remove numbers from selected cells.
  </p>
</Modal>
