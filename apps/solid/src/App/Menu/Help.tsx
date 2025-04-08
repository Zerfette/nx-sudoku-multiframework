import { useContext } from 'solid-js'
import { FaSolidQuestion } from 'solid-icons/fa'
import { style } from 'core/style'
import { Modal } from 'apps/solid/lib/components'
import { useDisclosure } from 'apps/solid/lib/hooks'
import { Context } from '.'
import { useResume } from 'apps/solid/lib/hooks/resume'

const _ = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const stopwatch = useContext(Context)!
  useResume(stopwatch, isOpen)

  return (
    <div>
      <div class={style.menu.btns.off} onClick={onOpen}>
        <FaSolidQuestion size={24} />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={style.component.modal}
      >
        <h1 class={style.typography.h1}>Getting Started</h1>
        <p class={style.typography.p}>
          Click cells to select them.
        </p>
        <p class={style.typography.p}>
          Hold
          <kbd class={style.typography.kbd}>CTRL</kbd>
          to select multiple cells.
        </p>
        <p class={style.typography.p}>
          Press
          <kbd class={style.typography.kbd}>CTRL</kbd>+
          <kbd class={style.typography.kbd}>A</kbd>
          to select all cells.
        </p>
        <p class={style.typography.p}>
          Press
          <kbd class={style.typography.kbd}>ENTER</kbd>
          or click off the board to clear the selection.
        </p>
        <p class={style.typography.p}>
          Press any number
          <kbd class={style.typography.kbd}>1</kbd>
          ...
          <kbd class={style.typography.kbd}>9</kbd>
          on the keyboard to place that number in the
          selected cells.
        </p>
        <p class={style.typography.p}>
          Press
          <kbd class={style.typography.kbd}>DEL</kbd>
          to remove numbers from selected cells.
        </p>
      </Modal>
    </div>
  )
}

export default _
