import { pipe } from 'fp-ts/function'
import { CoreEvent } from './types'

export const log =
  <E, P>(event: CoreEvent<E, P>) =>
  (eventData: { event: E; payload: P }) => {
    console.log(
      event.name,
      '\n',
      eventData,
      '\n',
      event(eventData)
    )
  }

export const toActions =
  <E, P>(coreEvent: CoreEvent<E, P>) =>
  (payload: P) =>
  (event: E) =>
    coreEvent({ event, payload })
