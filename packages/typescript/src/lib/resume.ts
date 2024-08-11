import { Disclosure } from './disclosure'
import { Stopwatch } from './stopwatch'

export class Resume {
  public resume = false

  constructor(element: HTMLElement, stopwatch: Stopwatch) {
    element.addEventListener('disclosure', (event) => {
      const {
        detail: { isOpen },
      } = event as CustomEvent<Disclosure>
      if (isOpen && stopwatch.isRunning) {
        stopwatch.toggleTimer()
        this.resume = true
      }

      if (!isOpen && this.resume) {
        stopwatch.toggleTimer()
        this.resume = false
      }
    })
  }
}
