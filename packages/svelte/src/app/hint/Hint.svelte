<script lang="ts">
  import { derived } from 'svelte/store'
  import { getFallback, getHint } from 'core/lib/components/hint'
  import { style } from 'core/style'
  import { isNonEmpty } from 'fp-ts/Array'
  import { state } from '~/store'
  import Digit from './Digit.svelte'
  import { digits } from 'core/interface/toolkit'

  const fallback = derived(state.selection, getFallback)
  const hint = derived(state.hints, getHint)
</script>

<div class={style.hint.root}>
  {#if isNonEmpty($hint)}
    {#each digits as digit}
      <Digit {digit} hint={$hint} />
    {/each}
  {:else}
    <p>{$fallback}</p>
  {/if}
</div>
