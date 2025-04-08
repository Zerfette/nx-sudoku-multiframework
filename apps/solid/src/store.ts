import { map } from 'fp-ts/Array'
import { constVoid } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'
import { ActionType } from 'core/actions/types'
import {
  canAutosolve,
  getHints,
  getSelectedOption,
  isSolved,
} from 'core/computed'
import { initialState } from 'core/interface/init'
import {
  Dispatch,
  DispatchFold,
  DispatchMap,
  Hints,
  Selection,
  State,
} from 'core/interface/types'
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
import { createStore } from 'solid-js/store'

export interface StateWithGetters extends State {
  hints: Hints
  selection: Selection
  isSolved: boolean
  canAutosolve: boolean
}

const init: StateWithGetters = {
  ...initialState,
  get hints() {
    return getHints(this.board)
  },
  get selection() {
    return getSelectedOption(this.board)
  },
  get isSolved() {
    return isSolved(this.board)
  },
  get canAutosolve() {
    return canAutosolve(this)
  },
}

const [state, setState] = createStore(init)

const dispatch: Dispatch = (action) => {
  switch (action.type) {
    case ActionType.AUTOSOLVE:
      setState('board', autosolve(action.payload))
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
      setState('board', selectNumber(action.payload))
      break
    case ActionType.RESET_BOARD:
      setState('board', resetBoard)
      break
    case ActionType.SELECT_ALL:
      setState('board', selectAll)
      break
    case ActionType.SELECT_CELL:
      setState('selectedNumber', 0)
      setState('board', selectCell(action.payload))
      break
    case ActionType.UPDATE_BIG:
      setState('board', updateBig(action.payload))
      break
    case ActionType.UPDATE_SMALL:
      setState('board', updateSmall(action.payload))
      break
    case ActionType.TOGGLE:
      setState('toggles', toggle(action.payload))
      break
    case ActionType.SET_TOGGLE:
      setState('toggles', setToggle(action.payload))
      break
    default:
      break
  }
}

const dispatchMap: DispatchMap = map(dispatch)
const dispatchFold: DispatchFold = fold(constVoid, dispatchMap)

export { dispatch, dispatchFold, dispatchMap, state }
