<script setup lang="ts">
import { computed } from 'vue'
import { getFallback, getHint } from 'core/lib/components/hint'
import { style } from 'core/style'
import { isNonEmpty } from 'fp-ts/Array'
import { useState } from '~/store'
import Digit from './Digit.vue'
import { digits } from 'core/interface/toolkit'

const state = useState()
const fallback = computed(() => getFallback(state.selection))
const hint = computed(() => getHint(state.hints))
</script>

<template>
  <div :class="style.hint.root">
    <Digit
      v-if="isNonEmpty(hint)"
      v-for="digit in digits"
      :digit="digit"
      :hint="hint"
    />
    <p v-else>{{fallback}}</p>
  </div>
</template>
