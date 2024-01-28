<script lang="ts">
  import Fa from 'svelte-fa'
  import { faRotate } from '@fortawesome/free-solid-svg-icons'
  import { resetBoard } from 'core/actions'
  import { style } from 'core/style'
  import { dispatch } from '~/store'

  const onClick = () => dispatch(resetBoard)
</script>

<div class={style.menu.btns.off} on:click={onClick}>
  <Fa icon={faRotate} size="lg" />
</div>
