import style from 'style'
import { useStopwatch } from '~/lib/hooks'
import {
  Autosolve,
  ColorMode,
  Edit,
  Help,
  StartOver,
} from './buttons'
import Timer from './timer'

const _ = () => {
  const stopwatch = useStopwatch()
  return (
    <div class={style.menu.root}>
      <Timer stopwatch={stopwatch} />
      <div class={style.menu.btns.root}>
        <StartOver />
        <Edit />
        <Autosolve />
        <ColorMode />
        <Help />
      </div>
    </div>
  )
}

export default _
