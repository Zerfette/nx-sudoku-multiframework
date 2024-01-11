import { createStore } from 'solid-js/store'
import { getHints, getSelectedOption, isSolved } from 'core/computed'
import { initialState } from 'core/init'
import { Hints, Selection, State } from 'core/interface/types'
import dispatch from './dispatch'

export interface StateWithGetters extends State {
  hints: Hints
  selection: Selection
  isSolved: boolean
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
  }
}

const [state, setState] = createStore(init)

export { dispatch, state, setState }