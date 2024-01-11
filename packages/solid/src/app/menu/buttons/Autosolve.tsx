import style from 'style'
import { BiSolidMagicWand } from 'solid-icons/bi'
import { toggle } from 'core/actions'
import { autosolveLens } from 'core/interface/optics'
import { dispatch, state } from '~/store'

const _ = () => {
  const onClick = () => dispatch(toggle({ lens: autosolveLens }))
  return (
    <div
      class={
        state.toggles.autosolve
          ? style.menu.btns.on
          : style.menu.btns.off
      }
      onClick={onClick}
    >
      <BiSolidMagicWand size={24} />
    </div>
  )
}

export default _
