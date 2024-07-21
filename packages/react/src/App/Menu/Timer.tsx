import {
  faPlay,
  faPause,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { style } from 'core/style'
import { Stopwatch } from '~/lib/hooks'

const Timer = ({
  stopwatch: { time, resetTimer, toggleTimer, isRunning },
}: {
  stopwatch: Stopwatch
}) => (
  <div className={style.menu.timer.root}>
    <p className={style.menu.timer.txt}>{time}</p>
    <div
      className={style.menu.timer.btn}
      onClick={toggleTimer}
    >
      {isRunning ? (
        <FontAwesomeIcon icon={faPause} size="sm" />
      ) : (
        <FontAwesomeIcon icon={faPlay} size="sm" />
      )}
    </div>
    <div
      className={style.menu.timer.btn}
      onClick={resetTimer}
    >
      <FontAwesomeIcon icon={faRotateLeft} size="sm" />
    </div>
  </div>
)

export default Timer
