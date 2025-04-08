import { style } from 'core/style'
import {
  library,
  icon,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { Disclosure } from '../lib/disclosure'
import { inBounds } from 'core/lib/components/modal'
import { Resume } from '../lib/resume'
import { Stopwatch } from '../lib/stopwatch'

export const setupHelp = (
  element: HTMLDivElement,
  stopwatch: Stopwatch
) => {
  library.add(faQuestion)
  const toIcon = (iconName: IconName) =>
    icon({
      prefix: 'fas',
      iconName,
    }).html.join(' ')

  element.classList.add(...style.menu.btns.off.split(' '))
  element.innerHTML = toIcon('question')
  element.style.fontSize = '24px'

  const modal =
    document.querySelector<HTMLDialogElement>('#helpModal')!
  const disclosure = new Disclosure(element)
  new Resume(element, stopwatch)
  const close = () => {
    modal.close()
    disclosure.onClose()
    document.body.style.overflow = ''
  }

  const open = () => {
    modal.showModal()
    disclosure.onOpen()
    document.body.style.overflow = 'hidden'
  }

  const clickOffListener = (event: MouseEvent) => {
    if (inBounds(modal)(event)) return
    close()
  }

  element.onclick = open
  modal.onclick = clickOffListener
}
