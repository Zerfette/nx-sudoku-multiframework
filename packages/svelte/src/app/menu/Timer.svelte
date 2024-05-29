<script lang="ts">
  import Fa from 'svelte-fa'
  import {
    faPause,
    faPlay,
    faRotateLeft,
  } from '@fortawesome/free-solid-svg-icons'
  import { style } from 'core/style'
  import { getContext } from 'svelte'
  import type { Stopwatch } from '~/lib/hooks'
  
  const { time, isRunning, resetTimer, toggleTimer } =
    getContext<Stopwatch>('stopwatch')
</script>

<div class={style.menu.timer.root}>
  <p class={style.menu.timer.txt}>{$time}</p>
  <button class={style.menu.timer.btn} onclick={toggleTimer}>
    {#if $isRunning}
      <Fa icon={faPause} size="sm" />
    {:else}
      <Fa icon={faPlay} size="sm" />
    {/if}
  </button>
  <button class={style.menu.timer.btn} onclick={resetTimer}>
    <Fa icon={faRotateLeft} size="sm" />
  </button>
</div>
