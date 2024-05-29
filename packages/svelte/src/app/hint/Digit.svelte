<script lang="ts">
  import { style } from 'core/style'
  import type { Digit } from 'core/interface/types'
  import { elem } from 'fp-ts/Array'
  import { Eq as nEq } from 'fp-ts/number'

  type Props = { digit: Digit; hint: Digit[] }
  let { digit, hint }: Props = $props()
  const className = $derived(
    elem(nEq)(digit)(hint)
      ? style.hint.number.on
      : style.hint.number.off
  )
</script>

<div class={className}>
  {digit}
</div>
