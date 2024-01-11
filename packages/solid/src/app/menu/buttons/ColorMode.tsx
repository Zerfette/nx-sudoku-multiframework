import style from 'style'
import { Show } from 'solid-js'
import { FaSolidMoon, FaSolidSun } from 'solid-icons/fa'
import { dispatch, state } from '~/store'
import { darkModeLens } from 'core/interface/optics'
import { toggle } from 'core/actions'

const _ = () => {
    const onClick = () => dispatch(toggle({lens: darkModeLens}))
  return (
    <div class={style.menu.btns.off} onClick={onClick}>
      <Show
        when={state.toggles.darkMode}
        fallback={<FaSolidMoon size={18} />}
      >
        <FaSolidSun size={18} />
      </Show>
    </div>
  )
}

export default _
