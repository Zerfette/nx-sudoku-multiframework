<script lang="ts">
  import Fa from 'svelte-fa'
  import { faRotate } from '@fortawesome/free-solid-svg-icons'
  import { resetBoard } from 'core/actions'
  import { style } from 'core/style'
  import { dispatch } from 'apps/svelte/store'

  const onclick = () => dispatch(resetBoard)
</script>

<button class={style.menu.btns.off} {onclick}>
  <Fa icon={faRotate} size="lg" />
</button>
