<script setup lang="ts">
import { style } from 'core/style'
import {
  faPause,
  faPlay,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { inject } from 'vue'
import type { Stopwatch } from '~/lib/hooks'

library.add(faPause, faPlay, faUndoAlt)
const stopwatch = inject<Stopwatch>('stopwatch') as Stopwatch
</script>

<template>
  <div :class="style.menu.timer.root">
    <p :class="style.menu.timer.txt">
      {{ stopwatch.time.value.replace('"', '') }}
    </p>
    <div :class="style.menu.timer.btn" @click="stopwatch.toggleTimer">
      <font-awesome-icon
        :icon="stopwatch.isRunning.value ? 'pause' : 'play'"
      />
    </div>
    <div :class="style.menu.timer.btn" @click="stopwatch.resetTimer">
      <font-awesome-icon icon="undo-alt" />
    </div>
  </div>
</template>
