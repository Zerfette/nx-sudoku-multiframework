import { Show } from 'solid-js'
import { FaSolidMoon, FaSolidSun } from 'solid-icons/fa'
import { toggle } from 'core/actions'
import { darkModeLens } from 'core/interface/optics'
import { style } from 'core/style'
import { dispatch, state } from '~/store'

const _ = () => {
  const onClick = () => dispatch(toggle({ lens: darkModeLens }))
  return (
    <div class={style.menu.btns.off} onClick={onClick}>
      <Show
        when={state.toggles.darkMode}
        fallback={<FaSolidMoon size={24} />}
      >
        <FaSolidSun size={24} />
      </Show>
    </div>
  )
}

export default _
