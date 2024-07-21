import {
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggle } from 'core/actions'
import { darkModeLens } from 'core/interface/optics'
import { style } from 'core/style'
import { useStore } from '~/store'

const ColorMode = () => {
  const { state, dispatch } = useStore()
  const className = style.menu.btns.off
  const onClick = () =>
    dispatch(toggle({ lens: darkModeLens }))
  return (
    <div className={className} onClick={onClick}>
      {state.toggles.darkMode ? (
        <FontAwesomeIcon icon={faSun} size="xl" />
      ) : (
        <FontAwesomeIcon icon={faMoon} size="xl" />
      )}
    </div>
  )
}

export default ColorMode
