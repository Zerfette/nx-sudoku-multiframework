import {
  type Ref,
  effect,
  ref
} from 'vue'
import { type Stopwatch } from './stopwatch'

export const useResume = (
  { isRunning, toggleTimer }: Stopwatch,
  isOpen: Ref<boolean>
) => {
  const resume = ref(false)
  effect(() => {
    if (isOpen.value && isRunning.value) {
      toggleTimer()
      resume.value = true
    }

    if (!isOpen.value && resume.value) {
      toggleTimer()
      resume.value = false
    }
  })
}