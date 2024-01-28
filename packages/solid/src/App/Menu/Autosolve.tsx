import { FaSolidHatWizard } from 'solid-icons/fa'
import { toggle } from 'core/actions'
import { autosolveLens } from 'core/interface/optics'
import { style } from 'core/style'
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
      <FaSolidHatWizard size={24} />
    </div>
  )
}

export default _
