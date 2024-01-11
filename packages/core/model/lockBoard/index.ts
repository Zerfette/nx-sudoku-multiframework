import { when } from 'fns'
import { map } from 'fp-ts/Array'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { Board } from '../../interface/types'
import {
  deselect,
  lock,
  valueIsNonZero,
} from '../../interface/toolkit'

const lockWhenNonZero = when(valueIsNonZero, lock)

export const lockBoard: Endomorphism<Board> = map(
  flow(deselect, lockWhenNonZero)
)
