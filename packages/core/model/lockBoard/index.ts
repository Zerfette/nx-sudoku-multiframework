import { when } from 'fns'
import { map } from 'fp-ts/Array'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import {
  removeDecoration,
  lock,
  valueIsNonZero,
} from '../../interface/toolkit'
import { Board } from '../../interface/types'

const lockWhenNonZero = when(valueIsNonZero, lock)

export const lockBoard: Endomorphism<Board> = map(
  flow(removeDecoration, lockWhenNonZero)
)
