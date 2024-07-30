<script setup lang="ts">
import { computed } from 'vue'
import {
  getFallback,
  getHint,
} from 'core/lib/components/hint'
import { style } from 'core/style'
import { isEmpty } from 'fp-ts/Array'
import { useState } from '~/store'
import Digit from './Digit.vue'
import { digits } from 'core/interface/toolkit'

const state = useState()
const fallback = computed(() =>
  getFallback(state.selection)
)
const hint = computed(() => getHint(state.hints))
</script>

<template>
  <div :class="style.hint.root">
    <div :class="style.hint.numbers">
      <Digit
        v-for="digit in digits"
        :digit="digit"
        :hint="hint"
      />
    </div>
    <div :class="style.hint.fallback">
      <p v-if="isEmpty(hint)">{{ fallback }}</p>
    </div>
  </div>
</template>
