import { mapWhen } from 'fns'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { Board } from '../../interface/types'
import { isUnlocked, select } from '../../interface/toolkit'

export const selectAll: Endomorphism<Board> = mapWhen(
  isUnlocked,
  select
)
