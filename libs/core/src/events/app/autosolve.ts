import { Cell, Digit, Hints, Selection } from 'core/interface/types'
import { lengthIs } from 'fns'
import { filter, map } from 'fp-ts/Array'
import { fold as bFold } from 'fp-ts/boolean'
import { none, fold as oFold, some } from 'fp-ts/Option'
import { autosolve } from '../../actions'
import { CoreEvent } from '../types'
import { head, NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { canSolve } from '../../computed'
import { pipe } from 'fp-ts/lib/function'

type Payload = {
  hints: Hints
  selectedNumber: Digit
  selection: Selection
}
export const autosolveEvent: CoreEvent<{}, Payload> = ({
  payload: { hints, selectedNumber, selection },
}) => {
  const onNone = () => none
  const onSome = (selection: NonEmptyArray<Cell>) => {
    const onFalse = () => {
      const solve = ({ location }: Cell) =>
        autosolve({ location, value: selectedNumber })
      return pipe(
        selection,
        filter(canSolve(selection)),
        map(solve),
        some
      )
    }
    const onTrue = () => {
      const { location } = head(selection)
      const value = head(hints.cell as NonEmptyArray<Digit>)
      return some([autosolve({ location, value })])
    }

    return bFold(onFalse, onTrue)(lengthIs(1)(hints.cell))
  }
  return oFold(onNone, onSome)(selection)
}
