import { Accessor, createEffect, createMemo, createSignal, onCleanup, onMount, Signal } from 'solid-js'
import { arrayOptionMonoid, getPrevTotal, Laps } from 'core/model/stopwatch'
import { fold as bFold } from 'fp-ts/boolean'
import { IO } from 'fp-ts/IO'
import { fold as oFold, none, some } from 'fp-ts/Option'
import { state } from '~/store'

const useTimer = () => {
  const [isRunning, setIsRunning] = createSignal(false)
  const [elapsedTime, setElapsedTime] = createSignal(0)
  const increment = () => setElapsedTime(prev => prev + 0.1)
  let interval: NodeJS.Timeout

  createMemo(() => {
    const onFalse = () => clearInterval(interval)
    const onTrue = () => (interval = setInterval(increment, 100))
    bFold(onFalse, onTrue)(isRunning())
  })

  onCleanup(() => clearInterval(interval))

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime
  }
}

export type Stopwatch = {
  elapsedTime: Accessor<number>
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
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer()

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLaps(() => none)
  }

  const addLap = () => {
    const onNone = () => elapsedTime()
    const onSome = () => elapsedTime() - getPrevTotal(laps())
    const currentLap = oFold(onNone, onSome)(laps())

    isRunning() &&
      setLaps(() => arrayOptionMonoid.concat(laps(), some([currentLap])))
  }

  const startTimer = () => setIsRunning(true)
  const stopTimer = () => setIsRunning(false)
  const toggleTimer = () => (isRunning() ? stopTimer() : startTimer())

  onMount(startTimer)

  createEffect(() => {
    if (!state.isSolved) return
    if (!isRunning()) return
    stopTimer()
  })

  return {
    elapsedTime: createMemo(() => +elapsedTime().toFixed(1)),
    laps,
    addLap,
    resetTimer,
    startTimer,
    stopTimer,
    toggleTimer,
    isRunning
  }
}
