import { Show } from 'solid-js'
import { FaSolidLock, FaSolidPlus } from 'solid-icons/fa'
import { clearBoard, lockBoard } from 'core/actions'
import { style } from 'core/style'
import { useDisclosure } from 'apps/solid/lib/hooks'
import { dispatch } from 'apps/solid/store'

const _ = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onClick = () => {
    isOpen() ? dispatch(lockBoard) : dispatch(clearBoard)
    onToggle()
  }
  return (
    <div class={style.menu.btns.off} onClick={onClick}>
      <Show when={isOpen()} fallback={<FaSolidPlus size={24} />}>
        <FaSolidLock size={24} />
      </Show>
    </div>
  )
}

export default _
