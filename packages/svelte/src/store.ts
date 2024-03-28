import type { Action } from 'core/actions/types'
import { ActionType } from 'core/actions/types'
import {
  canAutosolve,
  getHints,
  getSelectedOption,
  isSolved,
} from 'core/computed'
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
import { map } from 'fp-ts/Array'
import { constVoid } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'
import { derived, readonly, writable } from 'svelte/store'

const board = writable(initialState.board)
const selectedNumber = writable(initialState.selectedNumber)
const toggles = writable(initialState.toggles)

const state = {
  board: readonly(board),
  selectedNumber: readonly(selectedNumber),
  toggles: readonly(toggles),
  hints: derived(board, getHints),
  selection: derived(board, getSelectedOption),
  isSolved: derived(board, isSolved),
  canAutosolve: derived(
    [board, selectedNumber, toggles],
    ([board, selectedNumber, toggles]) =>
      canAutosolve({ board, selectedNumber, toggles })
  ),
}

const dispatch = (action: Action): void => {
  switch (action.type) {
    case ActionType.AUTOSOLVE:
      board.update(autosolve(action.payload))
      break
    case ActionType.SET_PUZZLE:
      board.set(puzzleToBoard(action.payload.puzzle))
      break
    case ActionType.CLEAR_SELECTION:
      selectedNumber.set(0)
      board.update(clearSelection)
      break
    case ActionType.CLEAR_BOARD:
      board.set(clearBoard)
      break
    case ActionType.LOCK_BOARD:
      board.update(lockBoard)
      break
    case ActionType.SELECT_NUMBER:
      board.update(clearSelection)
      selectedNumber.set(action.payload.value)
      board.update(selectNumber(action.payload))
      break
    case ActionType.RESET_BOARD:
      board.update(resetBoard)
      break
    case ActionType.SELECT_ALL:
      board.update(selectAll)
      break
    case ActionType.SELECT_CELL:
      selectedNumber.set(0)
      board.update(selectCell(action.payload))
      break
    case ActionType.UPDATE_BIG:
      board.update(updateBig(action.payload))
      break
    case ActionType.UPDATE_SMALL:
      board.update(updateSmall(action.payload))
      break
    case ActionType.TOGGLE:
      toggles.update(toggle(action.payload))
      break
    case ActionType.SET_TOGGLE:
      toggles.update(setToggle(action.payload))
      break
    default:
      break
  }
}

const dispatchMap: DispatchMap = map(dispatch)
const dispatchFold: DispatchFold = fold(constVoid, dispatchMap)

export { dispatch, dispatchFold, dispatchMap, state }
