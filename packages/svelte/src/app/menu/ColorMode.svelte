<script lang="ts">
  import Fa from 'svelte-fa'
  import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
  import { toggle } from 'core/actions'
  import { darkModeLens } from 'core/interface/optics'
  import { style } from 'core/style'
  import { dispatch, state } from '~/store'

  const onClick = () => dispatch(toggle({ lens: darkModeLens }))
  const {toggles} = state
</script>

<div class={style.menu.btns.off} on:click={onClick}>
    {#if $toggles.darkMode}
    <Fa icon={faSun} size="lg" />
  {:else}
    <Fa icon={faMoon} size="lg" />
  {/if}
  </div>