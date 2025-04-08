import { CoreEvent } from 'core/events/types'
import { pipe } from 'fp-ts/function'
import { dispatchFold } from 'apps/vue/store'

export const useEvent =
  <E, P>(coreEvent: CoreEvent<E, P>) =>
  (payload: P) => {
    return (event: E) => {
      pipe({ event, payload }, coreEvent, dispatchFold)

    }

  }
