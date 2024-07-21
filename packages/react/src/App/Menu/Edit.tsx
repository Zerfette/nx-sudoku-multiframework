import {
  faLock,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clearBoard, lockBoard } from 'core/actions'
import { style } from 'core/style'
import { useDisclosure } from '~/lib/hooks'
import { useStore } from '~/store'

const Edit = () => {
  const { dispatch } = useStore()
  const { isOpen, onToggle } = useDisclosure()
  const className = style.menu.btns.off
  const onClick = () => {
    isOpen ? dispatch(lockBoard) : dispatch(clearBoard)
    onToggle()
  }
  return (
    <div className={className} onClick={onClick}>
      {isOpen ? (
        <FontAwesomeIcon icon={faLock} size="xl" />
      ) : (
        <FontAwesomeIcon icon={faPlus} size="xl" />
      )}
    </div>
  )
}

export default Edit
