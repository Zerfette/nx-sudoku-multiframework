<script lang="ts">
  import Fa from 'svelte-fa'
  import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
  import { toggle } from 'core/actions'
  import { autosolveLens } from 'core/interface/optics'
  import { style } from 'core/style'
  import { dispatch, state } from '~/store'

  const onClick = () => dispatch(toggle({ lens: autosolveLens }))
  const { toggles } = state
</script>

<div
  class={$toggles.autosolve
    ? style.menu.btns.on
    : style.menu.btns.off}
  on:click={onClick}
>
  <Fa icon={faHatWizard} size="lg" />
</div>
