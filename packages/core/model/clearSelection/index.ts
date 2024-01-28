import { map } from 'fp-ts/Array'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { deselect, removeHighlight } from '../../interface/toolkit'
import { Board } from '../../interface/types'

export const clearSelection: Endomorphism<Board> = map(
  flow(removeHighlight, deselect)
)
