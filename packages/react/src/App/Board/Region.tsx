import { style } from 'core/style'
import Cell from './Cell'
import { map } from 'fp-ts/lib/Array'

const Region = ({ region }: { region: number[] }) => (
  <div className={style.board.region}>
    {map((i: number) => <Cell i={i} key={i}/>)(region)}
  </div>
)

export default Region
