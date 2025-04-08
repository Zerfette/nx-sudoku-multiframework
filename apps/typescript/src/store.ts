import type { Action } from 'core/actions/types'
import { ActionType } from 'core/actions/types'
import { type CoreEvent } from 'core/events/types'
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
  State,
} from 'core/interface/types'
import { map } from 'fp-ts/Array'
import { constVoid, pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'

type StateEvent = Event & { detail: State }

const emit = (type: string, detail: any) => {
  const event = new CustomEvent<StateEvent>(type, {
    bubbles: true,
    cancelable: true,
    detail,
  })
  document.dispatchEvent(event)
}

const handler = (name: string, data: any) => ({
  get: (obj: any, prop: string) => {
    if (prop === '_isProxy') return true
    const isObjectOrArray = ['object', 'array'].includes(
      Object.prototype.toString
        .call(obj[prop])
        .slice(8, -1)
        .toLowerCase()
    )
    if (isObjectOrArray && !obj[prop]._isProxy) {
      obj[prop] = new Proxy(obj[prop], handler(name, data))
    }
    return obj[prop]
  },
  set: (obj: any, prop: string, value: any) => {
    if (obj[prop] === value) return true
    obj[prop] = value
    emit(name, data)
    return true
  },
  deleteProperty: (obj: any, prop: string) => {
    delete obj[prop]
    emit(name, data)
    return true
  },
})

let store = (data: State, name: string) =>
  new Proxy(data, handler(name, data))

const state = store(initialState, 'state')

const dispatch = (action: Action) => {
  switch (action.type) {
    case ActionType.AUTOSOLVE:
      state.board = autosolve(action.payload)(state.board)
      break
    case ActionType.SET_PUZZLE:
      state.board = puzzleToBoard(action.payload.puzzle)
      break
    case ActionType.CLEAR_SELECTION:
      state.selectedNumber = 0
      state.board = clearSelection(state.board)
      break
    case ActionType.CLEAR_BOARD:
      state.board = clearBoard
      break
    case ActionType.LOCK_BOARD:
      state.board = lockBoard(state.board)
      break
    case ActionType.SELECT_NUMBER:
      state.board = clearSelection(state.board)
      state.selectedNumber = action.payload.value
      state.board = selectNumber(action.payload)(
        state.board
      )
      break
    case ActionType.RESET_BOARD:
      state.board = resetBoard(state.board)
      break
    case ActionType.SELECT_ALL:
      state.board = selectAll(state.board)
      break
    case ActionType.SELECT_CELL:
      state.selectedNumber = 0
      state.board = selectCell(action.payload)(state.board)
      break
    case ActionType.UPDATE_BIG:
      state.board = updateBig(action.payload)(state.board)
      break
    case ActionType.UPDATE_SMALL:
      state.board = updateSmall(action.payload)(state.board)
      break
    case ActionType.TOGGLE:
      state.toggles = toggle(action.payload)(state.toggles)
      break
    case ActionType.SET_TOGGLE:
      state.toggles = setToggle(action.payload)(
        state.toggles
      )
      break
    default:
      break
  }
}

const dispatchMap: DispatchMap = map(dispatch)
const dispatchFold: DispatchFold = fold(
  constVoid,
  dispatchMap
)

export const useEvent =
  <E, P>(coreEvent: CoreEvent<E, P>) =>
  (payload: P) =>
  (event: E) =>
    pipe({ event, payload }, coreEvent, dispatchFold)

export {
  dispatch,
  dispatchFold,
  dispatchMap,
  state,
  type StateEvent,
}
