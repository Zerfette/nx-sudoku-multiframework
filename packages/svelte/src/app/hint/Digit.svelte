<script lang="ts">
  import { style } from 'core/style'
  import type { Digit } from 'core/interface/types'
  import { elem } from 'fp-ts/Array'
  import { Eq as nEq } from 'fp-ts/number'

  export let digit: Digit
  export let hint: Digit[]
</script>

<div
  class={elem(nEq)(digit)(hint)
    ? style.hint.number.on
    : style.hint.number.off}
>
  {digit}
</div>
