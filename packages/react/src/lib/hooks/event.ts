import { CoreEvent } from 'core/events/types'
import { pipe } from 'fp-ts/function'
import { useStore } from '~/store'

export const useEvent =
  <E, P>(coreEvent: CoreEvent<E, P>) =>
  (payload: P) => {
    const { dispatchFold } = useStore()
    return (event: unknown) => {
      const eventData = {
        event: event as E,
        payload,
      }
      pipe(eventData, coreEvent, dispatchFold)
    }
  }
