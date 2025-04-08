import {
  Accessor,
  createEffect,
  createSignal,
} from 'solid-js'
import { Stopwatch } from './stopwatch'

export const useResume = (
  { isRunning, toggleTimer }: Stopwatch,
  isOpen: Accessor<boolean>
) => {
  const [resume, setResume] = createSignal(false)
  createEffect(() => {
    if (isOpen() && isRunning()) {
      toggleTimer()
      setResume(() => true)
    }

    if (!isOpen() && resume()) {
      toggleTimer()
      setResume(() => false)
    }
  })
}
