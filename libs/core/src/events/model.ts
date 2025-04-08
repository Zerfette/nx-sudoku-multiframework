import { CoreEvent } from './types'

export const toActions =
  <E, P>(coreEvent: CoreEvent<E, P>) =>
  (payload: P) =>
  (event: E) =>
    coreEvent({ event, payload })
