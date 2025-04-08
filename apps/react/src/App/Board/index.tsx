import { mouseOutsideEvent } from 'core/events/board'
import { regionIndicies } from 'core/interface/toolkit'
import { style } from 'core/style'
import { useEvent } from 'apps/react/lib/hooks'
import Region from './Region'
import { map } from 'fp-ts/lib/Array'

const Board = () => {
  const setMouseOutside = useEvent(mouseOutsideEvent)
  const onMouseOut = setMouseOutside({ value: true })
  const onMouseOver = setMouseOutside({ value: false })

  return (
    <div
      className={style.board.root}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      {map((region: number[]) => (
        <Region region={region} key={region.join()} />
      ))(regionIndicies)}
    </div>
  )
}

export default Board
