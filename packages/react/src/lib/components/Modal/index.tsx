import cn from 'classnames'
import { type Disclosure } from '~/lib/hooks'
import { IO } from 'fp-ts/IO'
import { useEffect, useRef } from 'react'
import { ReactFC } from '../../types'
import { inBounds } from './model'
import './style.module.css'

export type Dialog = HTMLDialogElement & {
  showModal: IO<void>
  close: IO<void>
}

export const Modal: ReactFC<{
  disclosure: Disclosure
}> = ({ children, disclosure, className }) => {
  let modal = useRef<Dialog>((<></>) as unknown as Dialog)
  const close = () => {
    modal.current.close()
    disclosure.onClose()
    document.body.style.overflow = ''
  }

  const open = () => {
    modal.current.showModal()
    document.body.style.overflow = 'hidden'
  }

  const clickOffListener = (event: React.MouseEvent) => {
    var rect = modal.current.getBoundingClientRect()
    if (!inBounds(rect)(event)) close()
  }

  useEffect(
    () => (disclosure.isOpen ? open() : close()),
    [disclosure.isOpen]
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
