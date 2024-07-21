import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { resetBoard } from 'core/actions'
import { style } from 'core/style'
import { useStore } from '~/store'

const StartOver = () => {
  const { dispatch } = useStore()
  const onClick = () => dispatch(resetBoard)
  return (
    <div className={style.menu.btns.off} onClick={onClick}>
      <FontAwesomeIcon icon={faRotate} size="xl" />
    </div>
  )
}

export default StartOver
