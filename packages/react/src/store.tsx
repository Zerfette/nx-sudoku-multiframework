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
import type {
  DispatchFold,
  DispatchMap,
  Hints,
  Selection,
  State,
} from 'core/interface/types'
import { map } from 'fp-ts/Array'
import { constVoid, pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'
import {
  createContext,
  useReducer,
  Reducer,
  PropsWithChildren,
  Dispatch,
  useMemo,
} from 'react'
import { boardLens } from 'core/interface/optics'

const reducer: Reducer<State, Action> = (
  { board, selectedNumber, toggles },
  action
) => {
  switch (action.type) {
    case ActionType.AUTOSOLVE:
      return {
        board: autosolve(action.payload)(board),
        selectedNumber,
        toggles,
      }
    case ActionType.SET_PUZZLE:
      return {
        board: puzzleToBoard(action.payload.puzzle),
        selectedNumber,
        toggles,
      }
    case ActionType.CLEAR_SELECTION:
      return {
        board: clearSelection(board),
        selectedNumber: 0,
        toggles,
      }
    case ActionType.CLEAR_BOARD:
      return {
        board: clearBoard,
        selectedNumber,
        toggles,
      }
    case ActionType.LOCK_BOARD:
      return {
        board: lockBoard(board),
        selectedNumber,
        toggles,
      }
    case ActionType.SELECT_NUMBER:
      return {
        board: pipe(
          board,
          clearSelection,
          selectNumber(action.payload)
        ),
        selectedNumber: action.payload.value,
        toggles,
      }
    case ActionType.RESET_BOARD:
      return {
        board: resetBoard(board),
        selectedNumber,
        toggles,
      }
    case ActionType.SELECT_ALL:
      return {
        board: selectAll(board),
        selectedNumber,
        toggles,
      }
    case ActionType.SELECT_CELL:
      return {
        board: selectCell(action.payload)(board),
        selectedNumber: 0,
        toggles,
      }
    case ActionType.UPDATE_BIG:
      return {
        board: updateBig(action.payload)(board),
        selectedNumber,
        toggles,
      }
    case ActionType.UPDATE_SMALL:
      return {
        board: updateSmall(action.payload)(board),
        selectedNumber,
        toggles,
      }
    case ActionType.TOGGLE:
      return {
        board,
        selectedNumber,
        toggles: toggle(action.payload)(toggles),
      }
    case ActionType.SET_TOGGLE:
      return {
        board,
        selectedNumber,
        toggles: setToggle(action.payload)(toggles),
      }
    default:
      return { board, selectedNumber, toggles }
  }
}

const store = createContext(initialState)

type Computed = {
  hints: Hints
  selection: Selection
  isSolved: boolean
  canAutosolve: boolean
}

type ProviderProps = {
  computed: Computed
  state: State
  dispatch: Dispatch<Action>
  dispatchMap: DispatchMap
  dispatchFold: DispatchFold
}

const StateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  )
  const dispatchMap = map(dispatch)
  const dispatchFold = fold(constVoid, dispatchMap)
  const Provider =
    store.Provider as unknown as React.Provider<ProviderProps>
  const computed = {
    hints: useMemo(
      () => pipe(state, boardLens.get, getHints),
      [state.board]
    ),
    selection: useMemo(
      () => pipe(state, boardLens.get, getSelectedOption),
      [state.board]
    ),
    isSolved: useMemo(
      () => pipe(state, boardLens.get, isSolved),
      [state.board]
    ),
    canAutosolve: useMemo(() => pipe(state, canAutosolve), [state]),
  }
  return (
    <Provider
      value={{ computed, state, dispatch, dispatchMap, dispatchFold }}
    >
      {children}
    </Provider>
  )
}

export { store, StateProvider }
