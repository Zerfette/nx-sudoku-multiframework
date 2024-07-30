import { Predicate } from 'fp-ts/lib/Predicate'

type inRange = (
  min: number,
  max: number
) => Predicate<number>
export const inRange: inRange = (min, max) => (value) =>
  min <= value && value <= max

type inBounds = (rect: {
  top: number
  left: number
  width: number
  height: number
}) => Predicate<React.MouseEvent>
export const inBounds: inBounds =
  ({ top, left, width, height }) =>
  ({ clientX, clientY }) => {
    return (
      inRange(top, top + height)(clientY) &&
      inRange(left, left + width)(clientX)
    )
  }
