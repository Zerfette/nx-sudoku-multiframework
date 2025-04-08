<script lang="ts">
  import { derived } from 'svelte/store'
  import {
    getFallback,
    getHint,
  } from 'core/lib/components/hint'
  import { style } from 'core/style'
  import { isEmpty } from 'fp-ts/Array'
  import { state } from 'apps/svelte/store'
  import Digit from './Digit.svelte'
  import { digits } from 'core/interface/toolkit'

  const fallback = derived(state.selection, getFallback)
  const hint = derived(state.hints, getHint)
</script>

<div class={style.hint.root}>
  <div class={style.hint.numbers}>
    {#each digits as digit}
      <Digit {digit} hint={$hint} />
    {/each}
  </div>
  <div class={style.hint.fallback}>
    {#if isEmpty($hint)}
      <p>{$fallback}</p>
    {/if}
  </div>
</div>
