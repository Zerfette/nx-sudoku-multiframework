import { Mutation, Toggles } from '../../interface/types'
import { Payload } from './types'

export const setToggle: Mutation<Toggles, Payload> = (
  toggles,
  { lens, value }
) => lens.set(value)(toggles)
