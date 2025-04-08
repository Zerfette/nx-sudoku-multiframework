import { IO } from 'fp-ts/IO'
import { Predicate } from 'fp-ts/Predicate'

export type Dialog = HTMLDialogElement & {
  showModal: IO<void>
  close: IO<void>
}

type inRange = (
  min: number,
  max: number
) => Predicate<number>
export const inRange: inRange = (min, max) => (value) =>
  min <= value && value <= max

type inBounds = (modal: Dialog) => Predicate<MouseEvent>
export const inBounds: inBounds =
  (modal) =>
  ({ clientX, clientY }) => {
    const { top, left, width, height } =
      modal.getBoundingClientRect()
    return (
      inRange(top, top + height)(clientY) &&
      inRange(left, left + width)(clientX)
    )
  }
