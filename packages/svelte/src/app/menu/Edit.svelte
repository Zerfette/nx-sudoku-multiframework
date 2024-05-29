<script lang="ts">
  import Fa from 'svelte-fa'
  import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
  import { clearBoard, lockBoard } from 'core/actions'
  import { style } from 'core/style'
  import { useDisclosure } from '~/lib/hooks'
  import { dispatch } from '~/store'

  const { isOpen, onToggle } = useDisclosure()
  const onclick = () => {
    $isOpen ? dispatch(lockBoard) : dispatch(clearBoard)
    onToggle()
  }
</script>

<button class={style.menu.btns.off} {onclick}>
  {#if $isOpen}
    <Fa icon={faLock} size="lg" />
  {:else}
    <Fa icon={faPlus} size="lg" />
  {/if}
</button>
