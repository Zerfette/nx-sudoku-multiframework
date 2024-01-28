import { type Dialog, targets } from 'core/lib/components/modal'
import { IO } from 'fp-ts/IO'
import { Component, createEffect } from 'solid-js'
import { Accessor } from 'solid-js'

type Props = {
  children: string
  isOpen: Accessor<boolean>
  onClose: IO<void>
}

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
