import { FaSolidQuestion } from 'solid-icons/fa'
import { style } from 'core/style'
import { Modal } from '~/lib/components'
import { useDisclosure } from '~/lib/hooks'

const _ = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <div>
      <div class={style.menu.btns.off} onClick={onOpen}>
        <FaSolidQuestion size={18} />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        This is a test modal
      </Modal>
    </div>
  )
}

export default _
