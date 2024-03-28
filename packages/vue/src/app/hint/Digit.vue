<script setup lang="ts">
import { style } from 'core/style'
import type { Digit } from 'core/interface/types'
import { elem } from 'fp-ts/Array'
import { Eq as nEq } from 'fp-ts/number'

interface Props {digit: Digit, hint: Digit[]}
const props = defineProps<Props>()

</script>

<template>
  <div
    :class="
      elem(nEq)(props.digit)(props.hint)
        ? style.hint.number.on
        : style.hint.number.off
    "
  >
    {{ digit }}
  </div>
</template>
