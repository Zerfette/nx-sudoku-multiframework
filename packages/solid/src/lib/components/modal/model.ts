import { Predicate } from 'fp-ts/Predicate'
import { Dialog } from './types'

type targets = (
  target: HTMLDialogElement | Dialog
) => Predicate<MouseEvent>
export const targets: targets = (target) => (event) =>
  event.target === target
