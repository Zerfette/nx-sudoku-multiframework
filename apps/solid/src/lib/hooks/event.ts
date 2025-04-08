import { CoreEvent } from 'core/events/types'
import { pipe } from 'fp-ts/function'
import { dispatchFold } from 'apps/solid/store'

export const useEvent =
  <E, P>(coreEvent: CoreEvent<E, P>) =>
  (payload: P) => {
    return (event: E) => {
      console.log(coreEvent.name, payload)
      pipe({ event, payload }, coreEvent, dispatchFold)
    }
  }
