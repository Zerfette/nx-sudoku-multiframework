import style from 'style'
import { FaSolidRotate } from 'solid-icons/fa'
import { resetBoard } from 'core/actions'
import { dispatch } from '~/store'

const _ = () => {
  const onClick = () => dispatch(resetBoard)
  return (
    <div class={style.menu.btns.off} onClick={onClick}>
      <FaSolidRotate size={18} />
    </div>
  )
}

export default _
