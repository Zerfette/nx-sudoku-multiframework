import {
  arrayOptionMonoid,
  getPrevTotal,
  getTimerText,
  Laps,
} from 'core/lib/hooks/stopwatch'
import { fold as oFold, none, some } from 'fp-ts/Option'

export class Stopwatch {
  private element
  private laps: Laps = none
  public isRunning: boolean = false
  private elapsedTime: number = 0
  private interval: NodeJS.Timeout | null = null

  constructor(element: HTMLDivElement) {
    this.element = element
  }

  private increment = () => {
    this.elapsedTime += 0.1
    this.element.dispatchEvent(
      new CustomEvent<Stopwatch>('stopwatch', {
        detail: this,
      })
    )
  }

  private clearTimer() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.element.dispatchEvent(
      new CustomEvent<Stopwatch>('stopwatch', {
        detail: this,
      })
    )
  }

  public resetTimer() {
    this.isRunning = false
    this.elapsedTime = 0
    this.laps = none
    this.clearTimer()
  }

  public addLap() {
    if (!this.isRunning) return
    const onNone = () => this.elapsedTime
    const onSome = () =>
      this.elapsedTime - getPrevTotal(this.laps)
    const currentLap = oFold(onNone, onSome)(this.laps)
    this.laps = arrayOptionMonoid.concat(
      this.laps,
      some([currentLap])
    )
  }

  public get time() {
    return getTimerText(+this.elapsedTime.toFixed(1))
  }

  public startTimer() {
    this.isRunning = true
    this.interval = setInterval(this.increment, 100)
  }

  public stopTimer() {
    this.isRunning = false
    this.clearTimer()
  }

  public toggleTimer() {
    this.isRunning ? this.stopTimer() : this.startTimer()
  }
}
