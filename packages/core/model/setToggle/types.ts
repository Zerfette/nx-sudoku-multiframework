import { Lens } from 'monocle-ts'
import { Toggles } from '../../interface/types'

export type Payload = { lens: Lens<Toggles, boolean>; value: boolean }