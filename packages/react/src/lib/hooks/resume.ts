import { Stopwatch } from './stopwatch'
import { useEffect, useState } from 'react'

export const useResume = (
  { isRunning, toggleTimer }: Stopwatch,
  isOpen: boolean
) => {
  const [resume, setResume] = useState(false)
  useEffect(() => {
    if (isOpen && isRunning) {
      toggleTimer()
      setResume(true)
    }

    if (!isOpen && resume) {
      toggleTimer()
      setResume(false)
    }
  }, [isOpen])
}
