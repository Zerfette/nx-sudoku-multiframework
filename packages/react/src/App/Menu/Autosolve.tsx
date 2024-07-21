import {
  faHatWizard
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggle } from 'core/actions'
import { autosolveLens } from 'core/interface/optics'
import { style } from 'core/style'
import { useStore } from '~/store'

const Autosolve = () => {
  const { state, dispatch } = useStore()
  const className = state.toggles.autosolve
    ? style.menu.btns.on
    : style.menu.btns.off
  const onClick = () =>
    dispatch(toggle({ lens: autosolveLens }))
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faHatWizard} size="xl"/>
    </div>
  )
}

export default Autosolve
