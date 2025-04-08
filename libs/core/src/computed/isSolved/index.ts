import { boardIsFilled, boardIsValid } from '../../interface/toolkit'
import { Board } from '../../interface/types'
import { allPass } from 'fns'

type isSolved = (board: Board) => boolean
export const isSolved: isSolved = allPass([
  boardIsFilled,
  boardIsValid,
])
