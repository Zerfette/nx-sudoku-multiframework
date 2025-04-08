import { Option } from 'fp-ts/Option'
import { Action } from '../actions/types'

export type CoreEvent<E, P> = (eventData: {
  event: E
  payload: P
}) => Option<Action[]>
