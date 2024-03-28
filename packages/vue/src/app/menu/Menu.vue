<script setup lang="ts">
import { style } from 'core/style'
import { effect, onMounted, provide } from 'vue'
import { useStopwatch } from '~/lib/hooks'
import { useState } from '~/store'
import Autosolve from './Autosolve.vue'
import ColorMode from './ColorMode.vue'
import Edit from './Edit.vue'
import Help from './Help.vue'
import StartOver from './StartOver.vue'
import Timer from './Timer.vue'

const stopwatch = useStopwatch()
const state = useState()
provide('stopwatch', stopwatch)
onMounted(stopwatch.startTimer)
effect(() => {
  if (!state.isSolved) return
  if (!stopwatch.isRunning) return
  stopwatch.stopTimer()
})
</script>

<template>
  <div :class="style.menu.root">
    <Timer />
    <div :class="style.menu.btns.root">
      <StartOver />
      <Edit />
      <Autosolve />
      <ColorMode />
      <Help />
    </div>
  </div>
</template>
