<script setup lang="ts">
import { style } from 'core/style'
import {
  faPause,
  faPlay,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { inject } from 'vue'
import type { Stopwatch } from 'apps/vue/lib/hooks'

const stopwatch = inject<Stopwatch>(
  'stopwatch'
) as Stopwatch
</script>

<template>
  <div :class="style.menu.timer.root">
    <p :class="style.menu.timer.txt">
      {{ stopwatch.time.value.replace('"', '') }}
    </p>
    <div
      :class="style.menu.timer.btn"
      @click="stopwatch.toggleTimer"
    >
      <font-awesome-icon
        size="sm"
        :icon="stopwatch.isRunning.value ? faPause : faPlay"
      />
    </div>
    <div
      :class="style.menu.timer.btn"
      @click="stopwatch.resetTimer"
    >
      <font-awesome-icon size="sm" :icon="faUndoAlt" />
    </div>
  </div>
</template>
