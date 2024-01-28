import { onDestroy, onMount } from 'svelte'

type useKeyDown = (callback: (event: KeyboardEvent) => void) => void
export const useKeyDown: useKeyDown = (callback) => {
  onMount(() => addEventListener('keydown', callback))
  onDestroy(() => removeEventListener('keydown', callback))
}