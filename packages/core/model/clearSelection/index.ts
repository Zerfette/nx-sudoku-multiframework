import { map } from 'fp-ts/Array'
import type { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { deselect, removeHighlight } from '../../interface/toolkit'
import type { Board } from '../../interface/types'

export const clearSelection: Endomorphism<Board> = map(
  flow(removeHighlight, deselect)
)
