import type { Action } from 'core/actions/types'
import { ActionType } from 'core/actions/types'
import { initialState } from 'core/interface/init'
import {
  autosolve,
  clearSelection,
  clearBoard,
  lockBoard,
  selectNumber,
  puzzleToBoard,
  resetBoard,
  selectAll,
  selectCell,
  setToggle,
  toggle,
  updateBig,
  updateSmall,
} from 'core/model'
import type { DispatchFold, DispatchMap } from 'core/interface/types'
import { defineStore } from 'pinia'
import { map } from 'fp-ts/Array'
import { constVoid, flow } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'
import {
  canAutosolve,
  getHints,
  getSelectedOption,
  isSolved,
} from 'core/computed'
import { boardLens } from 'core/interface/optics'

const useState = defineStore('state', {
  state: () => initialState,
  getters: {
    hints: flow(boardLens.get, getHints),
    selection: flow(boardLens.get, getSelectedOption),
    isSolved: flow(boardLens.get, isSolved),
    canAutosolve: canAutosolve,
  },
  actions: {
    dispatch(action: Action) {
      switch (action.type) {
        case ActionType.AUTOSOLVE:
          this.board = autosolve(action.payload)(this.board)
          break
        case ActionType.SET_PUZZLE:
          this.board = puzzleToBoard(action.payload.puzzle)
          break
        case ActionType.CLEAR_SELECTION:
          this.selectedNumber = 0
          this.board = clearSelection(this.board)
          break
        case ActionType.CLEAR_BOARD:
          this.board = clearBoard
          break
        case ActionType.LOCK_BOARD:
          this.board = lockBoard(this.board)
          break
        case ActionType.SELECT_NUMBER:
          this.board = clearSelection(this.board)
          this.selectedNumber = action.payload.value
          this.board = selectNumber(action.payload)(this.board)
          break
        case ActionType.RESET_BOARD:
          this.board = resetBoard(this.board)
          break
        case ActionType.SELECT_ALL:
          this.board = selectAll(this.board)
          break
        case ActionType.SELECT_CELL:
          this.selectedNumber = 0
          this.board = selectCell(action.payload)(this.board)
          break
        case ActionType.UPDATE_BIG:
          this.board = updateBig(action.payload)(this.board)
          break
        case ActionType.UPDATE_SMALL:
          this.board = updateSmall(action.payload)(this.board)
          break
        case ActionType.TOGGLE:
          this.toggles = toggle(action.payload)(this.toggles)
          break
        case ActionType.SET_TOGGLE:
          this.toggles = setToggle(action.payload)(this.toggles)
          break
        default:
          break
      }
    },
  },
})

// Lazy load to avoid using Pinia before it's initiated
const dispatchMap: DispatchMap = (actions) => map(useState().dispatch)(actions)
const dispatchFold: DispatchFold = (actions) => fold(constVoid, dispatchMap)(actions)

export { dispatchFold, dispatchMap, useState }
