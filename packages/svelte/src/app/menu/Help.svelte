<script lang="ts">
  import Fa from 'svelte-fa'
  import { faQuestion } from '@fortawesome/free-solid-svg-icons'
  import { style } from 'core/style'
</script>

<button class={style.menu.btns.off}>
  <Fa icon={faQuestion} size="lg" />
</button>
