import { setState } from './'
import { Action, ActionType } from 'core/actions/types'
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

const dispatch = (action: Action): void => {
  switch (action.type) {
    case ActionType.AUTOSOLVE:
      setState('board', (board) => autosolve(board, action.payload))
      break
    case ActionType.SET_PUZZLE:
      setState('board', puzzleToBoard(action.payload.puzzle))
      break
    case ActionType.CLEAR_SELECTION:
      setState('selectedNumber', 0)
      setState('board', clearSelection)
      break
    case ActionType.CLEAR_BOARD:
      setState('board', clearBoard)
      break
    case ActionType.LOCK_BOARD:
      setState('board', lockBoard)
      break
    case ActionType.SELECT_NUMBER:
      setState('board', clearSelection)
      setState('selectedNumber', action.payload.value)
      setState('board', (board) =>
        selectNumber(board, action.payload)
      )
      break
    case ActionType.RESET_BOARD:
      setState('board', resetBoard)
      break
    case ActionType.SELECT_ALL:
      setState('board', selectAll)
      break
    case ActionType.SELECT_CELL:
      setState('selectedNumber', 0)
      setState('board', (board) => selectCell(board, action.payload))
      break
    case ActionType.UPDATE_BIG:
      setState('board', (board) => updateBig(board, action.payload))
      break
    case ActionType.UPDATE_SMALL:
      setState('board', (board) => updateSmall(board, action.payload))
      break
    case ActionType.TOGGLE:
      setState('toggles', (toggles) =>
        toggle(toggles, action.payload)
      )
      break
    case ActionType.SET_TOGGLE:
      setState('toggles', (toggles) =>
        setToggle(toggles, action.payload)
      )
      break
    default:
      break
  }
}

export default dispatch
