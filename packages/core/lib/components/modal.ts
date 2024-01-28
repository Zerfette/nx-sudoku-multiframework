import { IO } from 'fp-ts/IO'
import { Predicate } from 'fp-ts/Predicate'

export type Dialog = HTMLDialogElement & {
  showModal: IO<void>
  close: IO<void>
}

type targets = (
  target: HTMLDialogElement | Dialog
) => Predicate<MouseEvent>
export const targets: targets = (target) => (event) =>
  event.target === target
