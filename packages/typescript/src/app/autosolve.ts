import { style } from 'core/style'
import {
  library,
  icon,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { StateEvent, dispatch } from '../store'
import { toggle } from 'core/actions'
import { autosolveLens } from 'core/interface/optics'

export const setupAutosolve = (element: HTMLDivElement) => {
  library.add(faHatWizard)
  const toIcon = (iconName: IconName) => icon({
      prefix: 'fas',
      iconName,
    }).html.join(' ')
  
  const on = () =>
    element.classList.add(...style.menu.btns.on.split(' '))
  const off = () =>
    element.classList.add(...style.menu.btns.off.split(' '))
  off()
  element.innerHTML = toIcon('hat-wizard')
  element.style.fontSize = '24px'
  element.onclick = () =>
    dispatch(toggle({ lens: autosolveLens }))

  document.addEventListener('state', (event) => {
    const {
      toggles: { autosolve },
    } = (event as StateEvent).detail
    element.classList.remove(...element.classList)
    autosolve ? on() : off()
  })
}
