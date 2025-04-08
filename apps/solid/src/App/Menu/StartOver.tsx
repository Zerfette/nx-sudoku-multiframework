import { FaSolidRotate } from 'solid-icons/fa'
import { resetBoard } from 'core/actions'
import { style } from 'core/style'
import { dispatch } from 'apps/solid/store'

const _ = () => {
  const onClick = () => dispatch(resetBoard)
  return (
    <div class={style.menu.btns.off} onClick={onClick}>
      <FaSolidRotate size={24} />
    </div>
  )
}

export default _
