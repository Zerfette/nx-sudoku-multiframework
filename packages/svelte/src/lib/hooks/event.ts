import { type CoreEvent } from 'core/events/types'
import { pipe } from 'fp-ts/function'
import { dispatchFold } from '~/store'

export const useEvent = <E, P>(
  coreEvent: CoreEvent<E, P>
) => {
  return (payload: P) => (event: E) =>
    pipe({ event, payload }, coreEvent, dispatchFold)
}
