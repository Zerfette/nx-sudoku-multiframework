import style from 'style'
import { Show } from 'solid-js'
import { FaSolidLock, FaSolidPlus } from 'solid-icons/fa'
import { clearBoard, lockBoard } from 'core/actions'
import { dispatch } from '~/store'
import { useDisclosure } from '~/lib/hooks'

const _ = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onClick = () => {
    isOpen() ? dispatch(lockBoard) : dispatch(clearBoard)
    onToggle()
  }
  return (
    <div class={style.menu.btns.off} onClick={onClick}>
      <Show when={isOpen()} fallback={<FaSolidPlus size={18} />}>
        <FaSolidLock size={18} />
      </Show>
    </div>
  )
}

export default _
