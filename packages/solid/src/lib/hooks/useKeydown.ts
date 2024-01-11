import { onCleanup, onMount } from 'solid-js'
import { elem } from 'fp-ts/Array'
import { range } from 'fp-ts/NonEmptyArray'
import { Eq as nEq } from 'fp-ts/number'
import { Predicate } from 'fp-ts/Predicate'

export enum Mod {
  CTRL,
  ALT,
  BOTH,
  NONE,
}

type getKeyMod = (ev: KeyboardEvent) => Mod
export const getKeyMod: getKeyMod = ({ altKey, ctrlKey }) => {
  if (!altKey && !ctrlKey) return Mod.NONE
  if (ctrlKey) return Mod.CTRL
  if (altKey) return Mod.ALT
  return Mod.BOTH
}

export const isNumericKey: Predicate<string> = (x) =>
  elem(nEq)(+x)(range(0, 9))

type useKeyDown = (callback: (event: KeyboardEvent) => void) => void
export const useKeyDown: useKeyDown = (callback) => {
  onMount(() => document.addEventListener('keydown', callback))
  onCleanup(() => document.removeEventListener('keydown', callback))
}
