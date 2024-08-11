import {
  arrayOptionMonoid,
  getPrevTotal,
  getTimerText,
  Laps,
} from 'core/lib/hooks/stopwatch'
import { IO } from 'fp-ts/IO'
import { fold as oFold, none, some } from 'fp-ts/Option'
import { useEffect, useMemo, useState } from 'react'

export type Stopwatch = {
  time: string
  laps: Laps
  addLap: IO<void>
  resetTimer: IO<void>
  startTimer: IO<void>
  stopTimer: IO<void>
  toggleTimer: IO<void>
  isRunning: boolean
}

export const useStopwatch: IO<Stopwatch> = () => {
  const [laps, setLaps] = useState<Laps>(none)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const increment = () =>
    setElapsedTime((prev) => prev + 0.1)

  let interval: NodeJS.Timeout
  useEffect(() => {
    if (isRunning) {
      interval = setInterval(increment, 100)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLaps(none)
    clearInterval(interval)
  }

  const addLap = () => {
    if (!isRunning) return
    const onNone = () => elapsedTime
    const onSome = () => elapsedTime - getPrevTotal(laps)
    const currentLap = oFold(onNone, onSome)(laps)
    setLaps(
      arrayOptionMonoid.concat(laps, some([currentLap]))
    )
  }

  const time = useMemo(
    () => getTimerText(+elapsedTime.toFixed(1)),
    [elapsedTime]
  )

  const startTimer = () => setIsRunning(true)

  const stopTimer = () => setIsRunning(false)

  const toggleTimer = () =>
    isRunning ? stopTimer() : startTimer()

  return {
    time,
    laps,
    addLap,
    resetTimer,
    startTimer,
    stopTimer,
    toggleTimer,
    isRunning,
  }
}
