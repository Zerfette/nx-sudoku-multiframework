import cn from 'classnames'
import { IO } from 'fp-ts/IO'
import { useEffect, useRef } from 'react'
import { ReactFC } from '../../types'
import { inBounds } from 'core/lib/components/modal'

export type Dialog = HTMLDialogElement & {
  showModal: IO<void>
  close: IO<void>
}

export const Modal: ReactFC<{
 isOpen: boolean, onClose: IO<void>
}> = ({ children, className, isOpen, onClose }) => {
  let modal = useRef<Dialog>((<></>) as unknown as Dialog)
  const close = () => {
    modal.current.close()
    onClose()
    document.body.style.overflow = ''
  }

  const open = () => {
    modal.current.showModal()
    document.body.style.overflow = 'hidden'
  }

  const clickOffListener = (event: React.MouseEvent) => {
    if (inBounds(modal.current)(event as unknown as MouseEvent)) return
    close()
  }

  useEffect(
    () => (isOpen ? open() : close()),
    [isOpen]
  )

  return (
    <dialog
      ref={modal}
      className={cn(className)}
      onClick={clickOffListener}
    >
      {children}
    </dialog>
  )
}
