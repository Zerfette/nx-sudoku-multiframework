import { Accessor } from 'solid-js'
import { IO } from 'fp-ts/IO'

export type Dialog = HTMLDialogElement & {
    showModal: IO<void>
    close: IO<void>
  }

  export type Props = {
    children: string
    isOpen: Accessor<boolean>
    onClose: IO<void>
  }