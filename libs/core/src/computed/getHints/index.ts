import { lengthIs, lensEq } from 'fns'
import { elem, filter, map, uniq } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
import { fold } from 'fp-ts/Option'
import { Lens } from 'monocle-ts'
import { getSelectedOption } from '../selection'
import {
  valueLens,
  rowLens,
  colLens,
  regLens,
  locationLens,
} from '../../interface/optics'
import { Board, Cell, Digit, Hints } from '../../interface/types'
import { digits } from '../../interface/toolkit'
import { isValidPlacement } from '../../model'

type getHints = (board: Board) => Hints
export const getHints: getHints = (board) => {
  const onNone = () => ({
    row: [],
    col: [],
    reg: [],
    cell: [],
  })

  const onSome = (selection: Cell[]) => {
    const singleSelected = lengthIs(1)(selection)
    const [head] = selection
    const isValid = (x: Digit) => isValidPlacement(board)(x)(head)

    const hasHints = (lens: Lens<Cell, number>) =>
      pipe(selection, map(lens.get), uniq(nEq), lengthIs(1))

    const section = (lens: Lens<Cell, number>) =>
      pipe(
        board,
        filter(lensEq(lens, lens.get(head))(nEq)),
        map(valueLens.get)
      )

    const conflicts = (lens: Lens<Cell, number>) => (x: number) =>
      !pipe(section(lens), elem(nEq)(x))

    const get = (lens: Lens<Cell, number>) =>
      hasHints(lens)
        ? (pipe(digits, filter(conflicts(lens))) as Digit[])
        : []

    return {
      cell: singleSelected
        ? (pipe(digits, filter(isValid)) as Digit[])
        : [],
      row: get(locationLens.compose(rowLens)),
      col: get(locationLens.compose(colLens)),
      reg: get(locationLens.compose(regLens)),
    }
  }

  return pipe(board, getSelectedOption, fold(onNone, onSome))
}
