import { mapWhen } from 'fns'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { Board } from '../../interface/types'
import {
    clearCorner,
    clearMiddle,
    clearValue,
    deselect,
    isUnlocked,
    removeHighlight
} from '../../interface/toolkit'

const reset = flow(
    deselect,
    removeHighlight,
    clearValue,
    clearCorner,
    clearMiddle
)

export const resetBoard: Endomorphism<Board> = mapWhen(isUnlocked, reset)