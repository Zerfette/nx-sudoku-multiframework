import { For, Show, createMemo } from 'solid-js'
import { getFallback, getHint } from 'core/lib/components/hint'
import { style } from 'core/style'
import { isNonEmpty } from 'fp-ts/Array'
import { state } from '~/store'
import Digit from './Digit'
import { digits } from 'core/interface/toolkit'

const _ = () => {
  const fallback = createMemo(() => getFallback(state.selection))
  const hint = createMemo(() => getHint(state.hints))
  return (
    <div class={style.hint.root}>
      <Show when={isNonEmpty(hint())} fallback={<p>{fallback()}</p>}>
        <For each={digits}>
          {(digit) => <Digit digit={digit} hint={hint()} />}
        </For>
      </Show>
    </div>
  )
}

export default _
