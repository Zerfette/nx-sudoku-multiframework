<script lang="ts">
  import Fa from 'svelte-fa'
  import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
  import { clearBoard, lockBoard } from 'core/actions'
  import { style } from 'core/style'
  import { useDisclosure } from '~/lib/hooks'
  import { dispatch } from '~/store'

  const { isOpen, onToggle } = useDisclosure()
  const onClick = () => {
    $isOpen ? dispatch(lockBoard) : dispatch(clearBoard)
    onToggle()
  }
</script>

<div class={style.menu.btns.off} on:click={onClick}>
  {#if $isOpen}
    <Fa icon={faLock} size="lg" />
  {:else}
    <Fa icon={faPlus} size="lg" />
  {/if}
</div>
