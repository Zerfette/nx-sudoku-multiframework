<script lang="ts">
  import {
    type Dialog,
    inBounds,
  } from 'core/lib/components/modal'
  import type { IO } from 'fp-ts/IO'
  import type { Readable } from 'svelte/store'
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet<[]>
    className?: string
    isOpen: Readable<boolean>
    onClose: IO<void>
  }
  const { children, className, isOpen, onClose }: Props = $props()
  let modal: Dialog
  const close = () => {
    if (!modal) return
    modal.close()
    onClose()
  }

  $effect(() => {
    $isOpen ? modal.showModal() : close()
  })

  const onclick = (event: MouseEvent) => {
    if (inBounds(modal)(event)) return
    close()
  }
</script>

  <dialog
    bind:this={modal}
    {onclick}
    class={className}
    role="none"
  >{@render children()}</dialog>
