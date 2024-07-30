import {
  library,
  icon,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import {
  faPause,
  faPlay,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Stopwatch } from '../lib/stopwatch'

export const setupTimer = (element: HTMLDivElement) => {
  library.add(faPause, faPlay, faUndoAlt)
  const toIcon = (iconName: IconName) =>
    icon({
      prefix: 'fas',
      iconName,
    }).html.join(' ')

  const stopwatch = new Stopwatch(element)

  const Text = element.querySelector('#stopwatchText')!
  Text.innerHTML = stopwatch.time

  const Toggle = element.querySelector<HTMLDivElement>(
    '#stopwatchToggle'
  )!
  Toggle.onclick = () => {
    stopwatch.isRunning
      ? stopwatch.stopTimer()
      : stopwatch.startTimer()
  }

  const Reset = element.querySelector('#stopwatchReset')!
  Reset.innerHTML = toIcon('undo-alt')
  Reset.addEventListener('click', () => {
    stopwatch.resetTimer()
  })

  stopwatch.startTimer()
  element.addEventListener('stopwatch', (event) => {
    const { time } = (event as CustomEvent<Stopwatch>)
      .detail
    Text.innerHTML = time
    Toggle.innerHTML = stopwatch.isRunning
      ? toIcon('pause')
      : toIcon('play')
  })
}
