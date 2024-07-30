import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { style } from 'core/style'
import { useDisclosure } from '~/lib/hooks'
import { Modal } from '~/lib/components'

const Help = () => {
  const disclosure = useDisclosure()

  return (
    <div>
      <div className={style.menu.btns.off} onClick={disclosure.onOpen}>
        <FontAwesomeIcon icon={faQuestion} size="xl" />
      </div>
      <Modal disclosure={disclosure}>
        HELP
      </Modal>
    </div>
  )
}

export default Help
