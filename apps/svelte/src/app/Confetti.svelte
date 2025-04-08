<script lang="ts">
  import P5 from 'p5'
  import { sketch } from 'confetti/sketch'
  import { style } from 'core/style'
  import { state } from 'apps/svelte/store'
  import { onDestroy } from 'svelte'

  let p5: P5
  let canvas: HTMLElement
  const { isSolved } = state

  $: {
    if ($isSolved) {
      p5 = new P5(sketch(document.body), canvas)
    } else {
      p5?.remove()
    }
  }

  onDestroy(() => p5?.remove())
</script>

<div bind:this={canvas} class={style.menu.confetti}></div>
