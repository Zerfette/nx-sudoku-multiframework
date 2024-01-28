import { Mutation, Toggles } from '../../interface/types'
import { Payload } from './types'

export const toggle: Mutation<Toggles, Payload> =
  ({ lens }) =>
  (toggles) =>
    lens.set(!lens.get(toggles))(toggles)
