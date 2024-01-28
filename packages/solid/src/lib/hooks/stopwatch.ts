import {
  Accessor,
  createMemo,
  createSignal,
  onCleanup,
  Signal,
} from 'solid-js'
import {
  arrayOptionMonoid,
  getPrevTotal,
  getTimerText,
  Laps,
} from 'core/lib/hooks/stopwatch'
import { IO } from 'fp-ts/IO'
import { fold as oFold, none, some } from 'fp-ts/Option'

export type Stopwatch = {
  time: Accessor<string>
  laps: Accessor<Laps>
  addLap: IO<void>
  resetTimer: IO<void>
  startTimer: IO<void>
  stopTimer: IO<void>
  toggleTimer: IO<void>
  isRunning: Accessor<boolean>
}

export const useStopwatch: IO<Stopwatch> = () => {
  const [laps, setLaps]: Signal<Laps> = createSignal<Laps>(none)
  const [isRunning, setIsRunning] = createSignal(false)
  const [elapsedTime, setElapsedTime] = createSignal(0)
  const increment = () => setElapsedTime((prev) => prev + 0.1)

  let interval: NodeJS.Timeout
  onCleanup(() => clearInterval(interval))

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLaps(none)
    clearInterval(interval)
  }

  const addLap = () => {
    if (!isRunning()) return
    const onNone = () => elapsedTime()
    const onSome = () => elapsedTime() - getPrevTotal(laps())
    const currentLap = oFold(onNone, onSome)(laps())
    setLaps(arrayOptionMonoid.concat(laps(), some([currentLap])))
  }

  const time = createMemo(() =>
    getTimerText(+elapsedTime().toFixed(1))
  )

  const startTimer = () => {
    setIsRunning(true)
    interval = setInterval(increment, 100)
  }

  const stopTimer = () => {
    setIsRunning(false)
    clearInterval(interval)
  }

  const toggleTimer = () => (isRunning() ? stopTimer() : startTimer())

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
