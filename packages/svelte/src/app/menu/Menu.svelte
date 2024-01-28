<script lang="ts">
  import { style } from 'core/style'
  import { onMount, setContext } from 'svelte'
  import { useStopwatch } from '~/lib/hooks'
  import { state } from '~/store'
  import Autosolve from './Autosolve.svelte'
  import ColorMode from './ColorMode.svelte'
  import Edit from './Edit.svelte'
  import Help from './Help.svelte'
  import StartOver from './StartOver.svelte'
  import Timer from './Timer.svelte'

  const stopwatch = useStopwatch()
  const { isRunning } = stopwatch
  const { isSolved } = state
  setContext('stopwatch', stopwatch)
  onMount(stopwatch.startTimer)
  $: {
    if ($isSolved && $isRunning) {
      stopwatch.stopTimer()
    }
  }
</script>

<div class={style.menu.root}>
  <Timer />
  <div class={style.menu.btns.root}>
    <StartOver />
    <Edit />
    <Autosolve />
    <ColorMode />
    <Help />
  </div>
</div>
