import {
  type Dialog,
  inBounds,
} from 'core/lib/components/modal'
import { IO } from 'fp-ts/IO'
import {
  Accessor,
  ParentComponent,
  createEffect,
} from 'solid-js'

interface Props {
  className: string
  isOpen: Accessor<boolean>
  onClose: IO<void>
}

const _: ParentComponent<Props> = ({
  children,
  className,
  isOpen,
  onClose,
}) => {
  let modal = (<></>) as Dialog
  const close = () => {
    modal.close()
    onClose()
  }

  createEffect(() =>
    isOpen() ? modal.showModal() : close()
  )

  const onClick = (event: MouseEvent) => {
    if (inBounds(modal)(event)) return
    close()
  }

  return (
    <dialog ref={modal} onClick={onClick} class={className}>
      <div>{children}</div>
    </dialog>
  )
}

export default _
