import { style } from 'core/style'
import {
  library,
  icon,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import {
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { StateEvent, dispatch } from '../store'
import { toggle } from 'core/actions'
import { darkModeLens } from 'core/interface/optics'

export const setupColorMode = (element: HTMLDivElement) => {
  library.add(faMoon, faSun)
  const toIcon = (iconName: IconName) =>
    icon({
      prefix: 'fas',
      iconName,
    }).html.join(' ')

  element.style.fontSize = '24px'
  element.classList.add(...style.menu.btns.off.split(' '))
  element.onclick = () =>
    dispatch(toggle({ lens: darkModeLens }))
  let Icon = toIcon('sun')
  element.innerHTML = Icon
  document.addEventListener('state', (event) => {
    const {
      toggles: { darkMode },
    } = (event as StateEvent).detail
    element.innerHTML = darkMode
      ? toIcon('sun')
      : toIcon('moon')
  })
}
