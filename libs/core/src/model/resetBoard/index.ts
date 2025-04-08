import { mapWhen } from 'fns'
import { map } from 'fp-ts/Array'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { Board } from '../../interface/types'
import {
  clearCorner,
  clearMiddle,
  clearValue,
  isUnlocked,
  removeDecoration,
} from '../../interface/toolkit'

const reset = flow(
  clearValue,
  clearCorner,
  clearMiddle
)

export const resetBoard: Endomorphism<Board> = flow(
  mapWhen(isUnlocked, reset),
  map(removeDecoration)
)
