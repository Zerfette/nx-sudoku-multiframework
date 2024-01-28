import {
    derived,
    get,
    writable,
    type Readable,
    type Writable,
  } from 'svelte/store'
  import {
    arrayOptionMonoid,
    getPrevTotal,
    getTimerText,
    type Laps,
  } from 'core/lib/hooks/stopwatch'
  import type { IO } from 'fp-ts/IO'
  import { fold as oFold, none, some } from 'fp-ts/Option'
  import { onDestroy } from 'svelte'
  
  export type Stopwatch = {
    time: Readable<string>
    laps: Writable<Laps>
    addLap: IO<void>
    resetTimer: IO<void>
    startTimer: IO<void>
    stopTimer: IO<void>
    toggleTimer: IO<void>
    isRunning: Writable<boolean>
  }
  
  export const useStopwatch: IO<Stopwatch> = () => {
    const laps: Writable<Laps> = writable<Laps>(none)
    const isRunning = writable(false)
    const elapsedTime = writable(0)
    const increment = () => elapsedTime.update((prev) => prev + 0.1)
  
    let interval: NodeJS.Timeout
    onDestroy(() => clearInterval(interval))
  
    const resetTimer = () => {
      isRunning.set(false)
      elapsedTime.set(0)
      laps.set(none)
      clearInterval(interval)
    }
  
    const addLap = () => {
      if (!get(isRunning)) return
      const onNone = () => get(elapsedTime)
      const onSome = () => get(elapsedTime) - getPrevTotal(get(laps))
      const currentLap = oFold(onNone, onSome)(get(laps))
      laps.set(arrayOptionMonoid.concat(get(laps), some([currentLap])))
    }
  
    const time = derived(elapsedTime, (elapsedTime) =>
      getTimerText(+elapsedTime.toFixed(1))
    )
  
    const startTimer = () => {
      isRunning.set(true)
      interval = setInterval(increment, 100)
    }
  
    const stopTimer = () => {
      isRunning.set(false)
      clearInterval(interval)
    }
  
    const toggleTimer = () =>
      get(isRunning) ? stopTimer() : startTimer()
  
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