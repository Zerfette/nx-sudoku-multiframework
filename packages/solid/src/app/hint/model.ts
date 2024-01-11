import { Accessor, createMemo } from 'solid-js'
import { state } from '~/store'
import { isNonEmpty } from 'fp-ts/Array'
import { IO } from 'fp-ts/IO'
import { fold } from 'fp-ts/Option'

export const getFallback: IO<Accessor<string>> = () =>
  createMemo(() => {
    const onNone = () => 'Make a selection to get hints.'
    const onSome = () =>
      'No valid hints. Make a new selection to get hints.'
    return fold(onNone, onSome)(state.selection)
  })

export const getHint: IO<Accessor<number[]>> = () =>
  createMemo(() =>
    isNonEmpty(state.hints.cell)
      ? state.hints.cell
      : isNonEmpty(state.hints.row)
      ? state.hints.row
      : isNonEmpty(state.hints.col)
      ? state.hints.col
      : state.hints.reg
  )

type getWhen = (hint: Accessor<number[]>) => Accessor<boolean>
export const getWhen: getWhen = (hint) =>
  createMemo(() => isNonEmpty(hint()))
