import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { style } from 'core/style'
import { useContext } from 'react'
import { useDisclosure, useResume } from 'apps/react/lib/hooks'
import { Modal } from 'apps/react/lib/components'
import { Context } from '.'

const Help = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const stopwatch = useContext(Context)
  useResume(stopwatch, isOpen)
  return (
    <div>
      <div className={style.menu.btns.off} onClick={onOpen}>
        <FontAwesomeIcon icon={faQuestion} size="xl" />
      </div>
      <Modal
        className={style.component.modal}
        isOpen={isOpen}
        onClose={onClose}
      >
        <h1 className={style.typography.h1}>
          Getting Started
        </h1>
        <p className={style.typography.p}>
          Click cells to select them.
        </p>
        <p className={style.typography.p}>
          Hold
          <kbd className={style.typography.kbd}>CTRL</kbd>
          to select multiple cells.
        </p>
        <p className={style.typography.p}>
          Press
          <kbd className={style.typography.kbd}>CTRL</kbd>+
          <kbd className={style.typography.kbd}>A</kbd>
          to select all cells.
        </p>
        <p className={style.typography.p}>
          Press
          <kbd className={style.typography.kbd}>ENTER</kbd>
          or click off the board to clear the selection.
        </p>
        <p className={style.typography.p}>
          Press any number
          <kbd className={style.typography.kbd}>1</kbd>
          ...
          <kbd className={style.typography.kbd}>9</kbd>
          on the keyboard to place that number in the
          selected cells.
        </p>
        <p className={style.typography.p}>
          Press
          <kbd className={style.typography.kbd}>DEL</kbd>
          to remove numbers from selected cells.
        </p>
      </Modal>
    </div>
  )
}

export default Help
