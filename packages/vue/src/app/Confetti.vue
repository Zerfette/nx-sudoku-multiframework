<script setup lang="ts">
import P5 from 'p5'
import { sketch } from 'confetti/sketch'
import { style } from 'core/style'
import { useState } from '~/store'
import { effect, onUnmounted, ref } from 'vue'

let p5: P5
let canvas = ref()
const state = useState()

effect(() => {
  if (state.isSolved) {
    p5 = new P5(sketch(document.body), canvas.value)
  } else {
    p5?.remove()
  }
})

onUnmounted(() => p5?.remove())
</script>

<template>
  <div ref="canvas" :class="style.menu.confetti" />
</template>
