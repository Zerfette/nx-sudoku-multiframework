import { style } from 'core/style'
import {
  library,
  icon,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import {
  faLock,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Disclosure } from '../lib/disclosure'
import { clearBoard, lockBoard } from 'core/actions'
import { dispatch } from '../store'

export const setupEdit = (element: HTMLDivElement) => {
  library.add(faLock, faPlus)
  const toIcon = (iconName: IconName) =>
    icon({
      prefix: 'fas',
      iconName,
    }).html.join(' ')

  const disclosure = new Disclosure(element)
  element.addEventListener('disclosure', (event) => {
    const {
      detail: { isOpen },
    } = event as CustomEvent<Disclosure>
    element.innerHTML = isOpen
      ? toIcon('lock')
      : toIcon('plus')
  })
  element.addEventListener('mousedown', () => {
    disclosure.isOpen
      ? dispatch(lockBoard)
      : dispatch(clearBoard)
    disclosure.onToggle()
  })

  element.classList.add(...style.menu.btns.off.split(' '))
  element.innerHTML = toIcon('plus')
  element.style.fontSize = '24px'
}
