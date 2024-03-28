import { onUnmounted, onMounted } from 'vue'

type useKeyDown = (callback: (event: KeyboardEvent) => void) => void
export const useKeyDown: useKeyDown = (callback) => {
  onMounted(() => addEventListener('keydown', callback))
  onUnmounted(() => removeEventListener('keydown', callback))
}
