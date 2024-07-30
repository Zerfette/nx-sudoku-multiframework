<script setup lang="ts">
import {
  autosolveEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
} from 'core/events/app'
import { style } from 'core/style'
import { effect } from 'vue'
import { useEvent } from '~/lib/hooks'
import { useState } from '~/store'
import Board from './board/Board.vue'
import Confetti from './Confetti.vue'
import Hint from './hint/Hint.vue'
import Menu from './menu/Menu.vue'

const state = useState()

const onMouseDown = useEvent(mouseDownEvent)({
  selection: state.selection,
  toggles: state.toggles,
})
const onMouseUp = useEvent(mouseUpEvent)({})
const onKeyDown = useEvent(keyDownEvent)({
  selection: state.selection,
})
const onAutosolve = useEvent(autosolveEvent)

effect(() => {
  if (state.canAutosolve)
    onAutosolve({
      hints: state.hints,
      selectedNumber: state.selectedNumber,
      selection: state.selection,
    })({})
})
</script>

<template>
  <div
    :class="
      state.toggles.darkMode
        ? style.root.dark
        : style.root.light
    "
    :tabindex="0"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keydown="onKeyDown"
  >
    <Menu />
    <Board />
    <Hint />
    <Confetti />
  </div>
</template>
