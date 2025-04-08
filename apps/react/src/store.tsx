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
import type { State } from 'core/interface/types'
import { map } from 'fp-ts/Array'
import { constVoid, pipe } from 'fp-ts/function'
import { fold, Option } from 'fp-ts/Option'
import {
  createContext,
  useContext,
  useReducer,
  Reducer,
  PropsWithChildren,
} from 'react'

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

const logDispatchError = () =>
  console.error(
    'Failed to read dispatch function from StateProvider.'
  )

const StoreContext = createContext({
  state: initialState,
  dispatch: (_: Action) => logDispatchError(),
  dispatchMap: (_: Action[]) => logDispatchError(),
  dispatchFold: (_: Option<Action[]>) => logDispatchError(),
})

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState)
  const dispatchMap = map(dispatch)
  const dispatchFold = fold(constVoid, dispatchMap)

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        dispatchMap,
        dispatchFold,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => useContext(StoreContext)

export { useStore, StoreProvider }
