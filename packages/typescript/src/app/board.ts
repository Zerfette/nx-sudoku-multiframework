import { state } from '../store'

export const setupBoard = (Board: HTMLDivElement) => {
  const onMouseOut = () => {
    state.toggles.mouseOutside = true
  }
  Board.addEventListener('mouseout', onMouseOut)
  const onMouseOver = () => {
    state.toggles.mouseOutside = false
  }
  Board.addEventListener('mouseover', onMouseOver)
}
