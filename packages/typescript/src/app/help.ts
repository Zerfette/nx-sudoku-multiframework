import { style } from 'core/style'
import {
  library,
  icon,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

export const setupHelp = (element: HTMLDivElement) => {
  library.add(faQuestion)
  const toIcon = (iconName: IconName) =>
    icon({
      prefix: 'fas',
      iconName,
    }).html.join(' ')

  element.classList.add(...style.menu.btns.off.split(' '))
  element.innerHTML = toIcon('question')
  element.style.fontSize = '24px'
}
