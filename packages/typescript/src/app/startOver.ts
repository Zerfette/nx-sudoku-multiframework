import { resetBoard } from 'core/actions'
import { style } from 'core/style'
import {
  library,
  icon,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { dispatch } from '../store'

export const setupStartOver = (element: HTMLDivElement) => {
  library.add(faRotate)

  const toIcon = (iconName: IconName) =>
    icon({
      prefix: 'fas',
      iconName,
    }).html.join(' ')

  element.classList.add(...style.menu.btns.off.split(' '))
  element.innerHTML = toIcon('rotate')
  element.style.fontSize = '24px'
  element.onclick = () => dispatch(resetBoard)
}
