import { CoreEvent } from 'core/events/types'
import { pipe } from 'fp-ts/function'
import { useStore } from '~/store'

// const log =
//   <E, P>(event: CoreEvent<E, P>) =>
//   (eventData: { event: E; payload: P }) => {
//     console.log(event.name, '\n', eventData, '\n', event(eventData))
//   }

export const useEvent =
  <E, P>(coreEvent: CoreEvent<E, P>) =>
  (payload: P) => {
    const { dispatchFold } = useStore()
    return (event: unknown) => {
      const eventData = {
        event: event as E,
        payload,
      }
      // log(coreEvent)(eventData)
      pipe(eventData, coreEvent, dispatchFold)
    }
  }
