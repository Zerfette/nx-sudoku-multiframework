import { Lens } from 'monocle-ts'
import { Cell, Digit, Puzzle, Smalls, Toggles } from '../interface/types'
import { ActionType } from './types'

export const autosolve = (payload: { ind: number; value: Digit }) =>
  <const>{ type: ActionType.AUTOSOLVE, payload }

export const selectNumber = (payload: { value: Digit }) =>
  <const>{ type: ActionType.SELECT_NUMBER, payload }

export const selectCell = (payload: { ind: number; clear: boolean }) =>
  <const>{ type: ActionType.SELECT_CELL, payload }

export const setPuzzle = (payload: { puzzle: Puzzle }) =>
  <const>{ type: ActionType.SET_PUZZLE, payload }

export const setToggle = (payload: {
  lens: Lens<Toggles, boolean>
  value: boolean
}) => <const>{ type: ActionType.SET_TOGGLE, payload }

export const toggle = (payload: { lens: Lens<Toggles, boolean> }) =>
  <const>{ type: ActionType.TOGGLE, payload }

export const updateBig = (payload: { value: number }) =>
  <const>{ type: ActionType.UPDATE_BIG, payload }

export const updateSmall = (payload: {
  lens: Lens<Cell, Smalls>
  value: number
}) => <const>{ type: ActionType.UPDATE_SMALL, payload }

export const clearBoard = <const>{ type: ActionType.CLEAR_BOARD }

export const clearSelection = <const>{ type: ActionType.CLEAR_SELECTION }

export const createPuzzle = <const>{ type: ActionType.CREATE_PUZZLE }

export const lockBoard = <const>{ type: ActionType.LOCK_BOARD }

export const resetBoard = <const>{ type: ActionType.RESET_BOARD }

export const selectAll = <const>{ type: ActionType.SELECT_ALL }