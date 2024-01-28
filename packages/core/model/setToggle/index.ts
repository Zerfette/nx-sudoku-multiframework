import { Mutation, Toggles } from '../../interface/types'
import { Payload } from './types'

export const setToggle: Mutation<Toggles, Payload> =
  ({ lens, value }) =>
  (toggles) =>
    lens.set(value)(toggles)
