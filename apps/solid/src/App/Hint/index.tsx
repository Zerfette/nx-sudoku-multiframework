import { For, Show, createMemo } from 'solid-js'
import {
  getFallback,
  getHint,
} from 'core/lib/components/hint'
import { style } from 'core/style'
import { isEmpty } from 'fp-ts/Array'
import { state } from 'apps/solid/store'
import Digit from './Digit'
import { digits } from 'core/interface/toolkit'

const _ = () => {
  const fallback = createMemo(() =>
    getFallback(state.selection)
  )
  const hint = createMemo(() => getHint(state.hints))
  return (
    <>
      <div class={style.hint.root}>
        <div class={style.hint.numbers}>
          <For each={digits}>
            {(digit) => <Digit digit={digit} hint={hint} />}
          </For>
        </div>
        <div class={style.hint.fallback}>
          <Show when={isEmpty(hint())}>
            <p>{fallback()}</p>
          </Show>
        </div>
      </div>
    </>
  )
}

export default _
