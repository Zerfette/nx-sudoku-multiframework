import { Component, createEffect } from 'solid-js'
import { targets } from './model'
import { Dialog, Props } from './types'

const _: Component<Props> = ({ children, isOpen, onClose }) => {
  let modal = (<></>) as Dialog
  const close = () => {
    modal.close()
    onClose()
  }

  createEffect(() => (isOpen() ? modal.showModal() : close()))

  const onClick = (event: MouseEvent) =>
    targets(modal)(event) ? close() : null

  return (
    <dialog ref={modal} onClick={onClick}>
      <div>{children}</div>
    </dialog>
  )
}

export default _
