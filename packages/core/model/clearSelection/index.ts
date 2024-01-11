import { map } from 'fp-ts/Array'
import { flow } from 'fp-ts/function'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { Board } from '../../interface/types'
import { deselect, removeHighlight } from '../../interface/toolkit'

export const clearSelection: Endomorphism<Board> = map(flow(deselect, removeHighlight))