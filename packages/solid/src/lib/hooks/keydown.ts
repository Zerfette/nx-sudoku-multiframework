import { onCleanup, onMount } from 'solid-js'

type useKeyDown = (callback: (event: KeyboardEvent) => void) => void
export const useKeyDown: useKeyDown = (callback) => {
  onMount(() => addEventListener('keydown', callback))
  onCleanup(() => removeEventListener('keydown', callback))
}
