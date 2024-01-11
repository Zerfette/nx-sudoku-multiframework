import { For, Show } from 'solid-js'
import { range } from 'fp-ts/NonEmptyArray'
import style from 'style'
import Digit from './component'
import { getFallback, getHint, getWhen } from './model'

const _ = () => {
  const fallback = getFallback()
  const hint = getHint()
  const when = getWhen(hint)
  return (
    <div class={style.hint.root}>
      <Show when={when()} fallback={<p>{fallback()}</p>}>
        <For each={range(1, 9)}>
          {(i) => <Digit i={i} hint={hint} />}
        </For>
      </Show>
    </div>
  )
}

export default _
